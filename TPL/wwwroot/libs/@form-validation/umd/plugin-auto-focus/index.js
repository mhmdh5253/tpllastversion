(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory(require("@form-validation/core"), require("@form-validation/plugin-field-status"))
        : typeof define === "function" && define.amd
        ? define(["@form-validation/core", "@form-validation/plugin-field-status"], factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.plugins =
            global.FormValidation.plugins || {}, global.FormValidation.plugins.AutoFocus =
            factory(global.FormValidation, global.FormValidation.plugins)));
})(this,
    (function(core, pluginFieldStatus) {
        "use strict";

        /******************************************************************************
        Copyright (c) Microsoft Corporation.

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.

        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
        /* global Reflect, Promise */

        var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function(d, b) { d.__proto__ = b; }) ||
                function(d, b) { for (let p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };

        function __extends(d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError(`Class extends value ${String(b)} is not a constructor or null`);
            extendStatics(d, b);

            function __() { this.constructor = d; }

            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        }

        /**
         * FormValidation (https://formvalidation.io)
         * The best validation library for JavaScript
         * (c) 2013 - 2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */
        const AutoFocus = (function(_super) {
            __extends(AutoFocus, _super);

            function AutoFocus(opts) {
                const _this = _super.call(this, opts) || this;
                _this.opts = Object.assign({},
                    {
                        onPrefocus: function() {},
                    },
                    opts);
                _this.invalidFormHandler = _this.onFormInvalid.bind(_this);
                return _this;
            }

            AutoFocus.prototype.install = function() {
                this.core
                    .on("core.form.invalid", this.invalidFormHandler)
                    .registerPlugin(AutoFocus.FIELD_STATUS_PLUGIN, new pluginFieldStatus.FieldStatus());
            };
            AutoFocus.prototype.uninstall = function() {
                this.core.off("core.form.invalid", this.invalidFormHandler)
                    .deregisterPlugin(AutoFocus.FIELD_STATUS_PLUGIN);
            };
            AutoFocus.prototype.onEnabled = function() {
                this.core.enablePlugin(AutoFocus.FIELD_STATUS_PLUGIN);
            };
            AutoFocus.prototype.onDisabled = function() {
                this.core.disablePlugin(AutoFocus.FIELD_STATUS_PLUGIN);
            };
            AutoFocus.prototype.onFormInvalid = function() {
                if (!this.isEnabled) {
                    return;
                }
                const plugin = this.core.getPlugin(AutoFocus.FIELD_STATUS_PLUGIN);
                var statuses = plugin.getStatuses();
                const invalidFields = Object.keys(this.core.getFields()).filter(function(key) {
                    return statuses.get(key) === "Invalid";
                });
                if (invalidFields.length > 0) {
                    const firstInvalidField = invalidFields[0];
                    const elements = this.core.getElements(firstInvalidField);
                    if (elements.length > 0) {
                        const firstElement = elements[0];
                        const e = {
                            firstElement: firstElement,
                            field: firstInvalidField,
                        };
                        this.core.emit("plugins.autofocus.prefocus", e);
                        this.opts.onPrefocus(e);
                        // Focus on the first invalid element
                        firstElement.focus();
                    }
                }
            };
            AutoFocus.FIELD_STATUS_PLUGIN = "___autoFocusFieldStatus";
            return AutoFocus;
        }(core.Plugin));

        return AutoFocus;

    }));
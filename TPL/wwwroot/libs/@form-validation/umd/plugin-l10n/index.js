(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory(require("@form-validation/core"))
        : typeof define === "function" && define.amd
        ? define(["@form-validation/core"], factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.plugins =
            global.FormValidation.plugins || {}, global.FormValidation.plugins.L10n = factory(global.FormValidation)));
})(this,
    (function(core) {
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
        const L10n = (function(_super) {
            __extends(L10n, _super);

            function L10n(opts) {
                const _this = _super.call(this, opts) || this;
                _this.messageFilter = _this.getMessage.bind(_this);
                return _this;
            }

            L10n.prototype.install = function() {
                this.core.registerFilter("validator-message", this.messageFilter);
            };
            L10n.prototype.uninstall = function() {
                this.core.deregisterFilter("validator-message", this.messageFilter);
            };
            L10n.prototype.getMessage = function(locale, field, validator) {
                if (!this.isEnabled) {
                    return "";
                }
                if (this.opts[field] && this.opts[field][validator]) {
                    const message = this.opts[field][validator];
                    const messageType = typeof message;
                    if ("object" === messageType && message[locale]) {
                        // message is a literal object
                        return message[locale];
                    } else if ("function" === messageType) {
                        // message is defined by a function
                        const result = message.apply(this, [field, validator]);
                        return result && result[locale] ? result[locale] : "";
                    }
                }
                return "";
            };
            return L10n;
        }(core.Plugin));

        return L10n;

    }));
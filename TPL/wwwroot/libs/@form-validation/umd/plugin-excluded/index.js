(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory(require("@form-validation/core"))
        : typeof define === "function" && define.amd
        ? define(["@form-validation/core"], factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.plugins =
            global.FormValidation.plugins || {}, global.FormValidation.plugins.Excluded =
            factory(global.FormValidation)));
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
        var removeUndefined = core.utils.removeUndefined;
        const Excluded = (function(_super) {
            __extends(Excluded, _super);

            function Excluded(opts) {
                const _this = _super.call(this, opts) || this;
                _this.opts = Object.assign({}, { excluded: Excluded.defaultIgnore }, removeUndefined(opts));
                _this.ignoreValidationFilter = _this.ignoreValidation.bind(_this);
                return _this;
            }

            Excluded.defaultIgnore = function(_field, element, _elements) {
                const isVisible = !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
                const disabled = element.getAttribute("disabled");
                return disabled === "" ||
                    disabled === "disabled" ||
                    element.getAttribute("type") === "hidden" ||
                    !isVisible;
            };
            Excluded.prototype.install = function() {
                this.core.registerFilter("element-ignored", this.ignoreValidationFilter);
            };
            Excluded.prototype.uninstall = function() {
                this.core.deregisterFilter("element-ignored", this.ignoreValidationFilter);
            };
            Excluded.prototype.ignoreValidation = function(field, element, elements) {
                if (!this.isEnabled) {
                    return false;
                }
                return this.opts.excluded.apply(this, [field, element, elements]);
            };
            return Excluded;
        }(core.Plugin));

        return Excluded;

    }));
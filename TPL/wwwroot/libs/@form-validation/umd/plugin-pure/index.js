(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory(require("@form-validation/core"), require("@form-validation/plugin-framework"))
        : typeof define === "function" && define.amd
        ? define(["@form-validation/core", "@form-validation/plugin-framework"], factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.plugins =
            global.FormValidation.plugins || {}, global.FormValidation.plugins.Pure =
            factory(global.FormValidation, global.FormValidation.plugins)));
})(this,
    (function(core, pluginFramework) {
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
        var classSet = core.utils.classSet;
        const Pure = (function(_super) {
            __extends(Pure, _super);

            function Pure(opts) {
                return _super.call(this,
                        Object.assign({},
                            {
                                formClass: "fv-plugins-pure",
                                messageClass: "fv-help-block",
                                rowInvalidClass: "fv-has-error",
                                rowPattern: /^.*pure-control-group.*$/,
                                rowSelector: ".pure-control-group",
                                rowValidClass: "fv-has-success",
                            },
                            opts)) ||
                    this;
            }

            Pure.prototype.onIconPlaced = function(e) {
                const type = e.element.getAttribute("type");
                if ("checkbox" === type || "radio" === type) {
                    const parent_1 = e.element.parentElement;
                    classSet(e.iconElement,
                        {
                            'fv-plugins-icon-check': true,
                        });
                    if ("LABEL" === parent_1.tagName) {
                        parent_1.parentElement.insertBefore(e.iconElement, parent_1.nextSibling);
                    }
                }
            };
            return Pure;
        }(pluginFramework.Framework));

        return Pure;

    }));
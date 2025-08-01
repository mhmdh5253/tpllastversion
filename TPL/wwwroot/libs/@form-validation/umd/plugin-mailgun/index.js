(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory(require("@form-validation/core"), require("@form-validation/plugin-alias"))
        : typeof define === "function" && define.amd
        ? define(["@form-validation/core", "@form-validation/plugin-alias"], factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.plugins =
            global.FormValidation.plugins || {}, global.FormValidation.plugins.Mailgun =
            factory(global.FormValidation, global.FormValidation.plugins)));
})(this,
    (function(core, pluginAlias) {
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
        /**
         * This plugin is used to validate an email address by using Mailgun API
         */
        const Mailgun = (function(_super) {
            __extends(Mailgun, _super);

            function Mailgun(opts) {
                const _this = _super.call(this, opts) || this;
                _this.opts = Object.assign({}, { suggestion: false }, removeUndefined(opts));
                _this.messageDisplayedHandler = _this.onMessageDisplayed.bind(_this);
                return _this;
            }

            Mailgun.prototype.install = function() {
                if (this.opts.suggestion) {
                    this.core.on("plugins.message.displayed", this.messageDisplayedHandler);
                }
                const aliasOpts = {
                    mailgun: "remote",
                };
                this.core.registerPlugin(Mailgun.ALIAS_PLUGIN, new pluginAlias.Alias(aliasOpts)).addField(
                    this.opts.field,
                    {
                        validators: {
                            mailgun: {
                                crossDomain: true,
                                data: {
                                    api_key: this.opts.apiKey,
                                },
                                headers: {
                                    'Content-Type': "application/json",
                                },
                                message: this.opts.message,
                                name: "address",
                                url: "https://api.mailgun.net/v3/address/validate",
                                validKey: "is_valid",
                            },
                        },
                    });
            };
            Mailgun.prototype.uninstall = function() {
                if (this.opts.suggestion) {
                    this.core.off("plugins.message.displayed", this.messageDisplayedHandler);
                }
                this.core.deregisterPlugin(Mailgun.ALIAS_PLUGIN);
                this.core.removeField(this.opts.field);
            };
            Mailgun.prototype.onEnabled = function() {
                this.core.enableValidator(this.opts.field, "mailgun").enablePlugin(Mailgun.ALIAS_PLUGIN);
            };
            Mailgun.prototype.onDisabled = function() {
                this.core.disableValidator(this.opts.field, "mailgun").disablePlugin(Mailgun.ALIAS_PLUGIN);
            };
            Mailgun.prototype.onMessageDisplayed = function(e) {
                if (this.isEnabled &&
                    e.field === this.opts.field &&
                    "mailgun" === e.validator &&
                    e.meta &&
                    e.meta["did_you_mean"]) {
                    e.messageElement.innerHTML = "Did you mean ".concat(e.meta["did_you_mean"], "?");
                }
            };
            Mailgun.ALIAS_PLUGIN = "___mailgunAlias";
            return Mailgun;
        }(core.Plugin));

        return Mailgun;

    }));
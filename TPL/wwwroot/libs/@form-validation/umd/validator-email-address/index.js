(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory(require("@form-validation/core"))
        : typeof define === "function" && define.amd
        ? define(["@form-validation/core"], factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.validators =
            global.FormValidation.validators || {}, global.FormValidation.validators.emailAddress =
            factory(global.FormValidation)));
})(this,
    (function(core) {
        "use strict";

        /**
         * FormValidation (https://formvalidation.io)
         * The best validation library for JavaScript
         * (c) 2013 - 2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */
        var removeUndefined = core.utils.removeUndefined;
        // Email address regular expression
        // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var GLOBAL_DOMAIN_OPTIONAL =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        var GLOBAL_DOMAIN_REQUIRED =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

        function emailAddress() {
            var splitEmailAddresses = function(emailAddresses, separator) {
                const quotedFragments = emailAddresses.split(/"/);
                const quotedFragmentCount = quotedFragments.length;
                const emailAddressArray = [];
                var nextEmailAddress = "";
                for (let i = 0; i < quotedFragmentCount; i++) {
                    if (i % 2 === 0) {
                        const splitEmailAddressFragments = quotedFragments[i].split(separator);
                        const splitEmailAddressFragmentCount = splitEmailAddressFragments.length;
                        if (splitEmailAddressFragmentCount === 1) {
                            nextEmailAddress += splitEmailAddressFragments[0];
                        } else {
                            emailAddressArray.push(nextEmailAddress + splitEmailAddressFragments[0]);
                            for (let j = 1; j < splitEmailAddressFragmentCount - 1; j++) {
                                emailAddressArray.push(splitEmailAddressFragments[j]);
                            }
                            nextEmailAddress = splitEmailAddressFragments[splitEmailAddressFragmentCount - 1];
                        }
                    } else {
                        nextEmailAddress += `"${quotedFragments[i]}`;
                        if (i < quotedFragmentCount - 1) {
                            nextEmailAddress += '"';
                        }
                    }
                }
                emailAddressArray.push(nextEmailAddress);
                return emailAddressArray;
            };
            return {
                /**
                 * Return true if and only if the input value is a valid email address
                 */
                validate: function(input) {
                    if (input.value === "") {
                        return { valid: true };
                    }
                    const opts = Object.assign({},
                        {
                            multiple: false,
                            requireGlobalDomain: false,
                            separator: /[,;]/,
                        },
                        removeUndefined(input.options));
                    const emailRegExp = opts.requireGlobalDomain ? GLOBAL_DOMAIN_REQUIRED : GLOBAL_DOMAIN_OPTIONAL;
                    const allowMultiple = opts.multiple === true || "".concat(opts.multiple) === "true";
                    if (allowMultiple) {
                        const separator = opts.separator || /[,;]/;
                        const addresses = splitEmailAddresses(input.value, separator);
                        const length_1 = addresses.length;
                        for (let i = 0; i < length_1; i++) {
                            if (!emailRegExp.test(addresses[i])) {
                                return { valid: false };
                            }
                        }
                        return { valid: true };
                    } else {
                        return { valid: emailRegExp.test(input.value) };
                    }
                },
            };
        }

        return emailAddress;

    }));
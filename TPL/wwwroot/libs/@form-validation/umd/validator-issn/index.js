(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory()
        : typeof define === "function" && define.amd
        ? define(factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.validators =
            global.FormValidation.validators || {}, global.FormValidation.validators.issn = factory()));
})(this,
    (function() {
        "use strict";

        /**
         * FormValidation (https://formvalidation.io)
         * The best validation library for JavaScript
         * (c) 2013 - 2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */
        function issn() {
            return {
                /**
                 * Validate ISSN (International Standard Serial Number)
                 * @see http://en.wikipedia.org/wiki/International_Standard_Serial_Number
                 */
                validate: function(input) {
                    if (input.value === "") {
                        return { valid: true };
                    }
                    // Groups are separated by a hyphen or a space
                    if (!/^\d{4}-\d{3}[\dX]$/.test(input.value)) {
                        return { valid: false };
                    }
                    // Replace all special characters except digits and X
                    const chars = input.value.replace(/[^0-9X]/gi, "").split("");
                    const length = chars.length;
                    var sum = 0;
                    if (chars[7] === "X") {
                        chars[7] = "10";
                    }
                    for (let i = 0; i < length; i++) {
                        sum += parseInt(chars[i], 10) * (8 - i);
                    }
                    return { valid: sum % 11 === 0 };
                },
            };
        }

        return issn;

    }));
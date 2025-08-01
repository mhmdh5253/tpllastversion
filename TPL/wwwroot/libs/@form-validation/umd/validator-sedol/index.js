(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory()
        : typeof define === "function" && define.amd
        ? define(factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.validators =
            global.FormValidation.validators || {}, global.FormValidation.validators.sedol = factory()));
})(this,
    (function() {
        "use strict";

        /**
         * FormValidation (https://formvalidation.io)
         * The best validation library for JavaScript
         * (c) 2013 - 2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */
        function sedol() {
            return {
                /**
                 * Validate a SEDOL (Stock Exchange Daily Official List)
                 * @see http://en.wikipedia.org/wiki/SEDOL
                 */
                validate: function(input) {
                    if (input.value === "") {
                        return { valid: true };
                    }
                    const v = input.value.toUpperCase();
                    if (!/^[0-9A-Z]{7}$/.test(v)) {
                        return { valid: false };
                    }
                    const weight = [1, 3, 1, 7, 3, 9, 1];
                    const length = v.length;
                    var sum = 0;
                    for (let i = 0; i < length - 1; i++) {
                        sum += weight[i] * parseInt(v.charAt(i), 36);
                    }
                    sum = (10 - (sum % 10)) % 10;
                    return { valid: "".concat(sum) === v.charAt(length - 1) };
                },
            };
        }

        return sedol;

    }));
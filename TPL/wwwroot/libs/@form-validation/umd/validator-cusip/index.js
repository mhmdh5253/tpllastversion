(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory()
        : typeof define === "function" && define.amd
        ? define(factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.validators =
            global.FormValidation.validators || {}, global.FormValidation.validators.cusip = factory()));
})(this,
    (function() {
        "use strict";

        /**
         * FormValidation (https://formvalidation.io)
         * The best validation library for JavaScript
         * (c) 2013 - 2023 Nguyen Huu Phuoc <me@phuoc.ng>
         */
        function cusip() {
            return {
                /**
                 * Validate a CUSIP number
                 * @see http://en.wikipedia.org/wiki/CUSIP
                 */
                validate: function(input) {
                    if (input.value === "") {
                        return { valid: true };
                    }
                    const value = input.value.toUpperCase();
                    // O, I aren't allowed
                    if (!/^[0123456789ABCDEFGHJKLMNPQRSTUVWXYZ*@#]{9}$/.test(value)) {
                        return { valid: false };
                    }
                    // Get the last char
                    const chars = value.split("");
                    const lastChar = chars.pop();
                    const converted = chars.map(function(c) {
                        const code = c.charCodeAt(0);
                        switch (true) {
                        case c === "*":
                            return 36;
                        case c === "@":
                            return 37;
                        case c === "#":
                            return 38;
                        // Replace A, B, C, ..., Z with 10, 11, ..., 35
                        case code >= "A".charCodeAt(0) && code <= "Z".charCodeAt(0):
                            return code - "A".charCodeAt(0) + 10;
                        default:
                            return parseInt(c, 10);
                        }
                    });
                    const sum = converted
                        .map(function(v, i) {
                            const double = i % 2 === 0 ? v : 2 * v;
                            return Math.floor(double / 10) + (double % 10);
                        })
                        .reduce(function(a, b) { return a + b; }, 0);
                    const checkDigit = (10 - (sum % 10)) % 10;
                    return { valid: lastChar === "".concat(checkDigit) };
                },
            };
        }

        return cusip;

    }));
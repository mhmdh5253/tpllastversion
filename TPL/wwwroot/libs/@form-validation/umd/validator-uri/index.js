(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? module.exports = factory(require("@form-validation/core"))
        : typeof define === "function" && define.amd
        ? define(["@form-validation/core"], factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, (global.FormValidation =
            global.FormValidation || {}, global.FormValidation.validators =
            global.FormValidation.validators || {}, global.FormValidation.validators.uri =
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

        function uri() {
            var DEFAULT_OPTIONS = {
                allowEmptyProtocol: false,
                allowLocal: false,
                protocol: "http, https, ftp",
            };
            return {
                /**
                 * Return true if the input value is a valid URL
                 */
                validate: function(input) {
                    if (input.value === "") {
                        return { valid: true };
                    }
                    const opts = Object.assign({}, DEFAULT_OPTIONS, removeUndefined(input.options));
                    // Credit to https://gist.github.com/dperini/729294
                    //
                    // Regular Expression for URL validation
                    //
                    // Author: Diego Perini
                    // Updated: 2010/12/05
                    //
                    // the regular expression composed & commented
                    // could be easily tweaked for RFC compliance,
                    // it was expressly modified to fit & satisfy
                    // these test for an URL shortener:
                    //
                    //   http://mathiasbynens.be/demo/url-regex
                    //
                    // Notes on possible differences from a standard/generic validation:
                    //
                    // - utf-8 char class take in consideration the full Unicode range
                    // - TLDs are mandatory unless `allowLocal` is true
                    // - protocols have been restricted to ftp, http and https only as requested
                    //
                    // Changes:
                    //
                    // - IP address dotted notation validation, range: 1.0.0.0 - 223.255.255.255
                    //   first and last IP address of each class is considered invalid
                    //   (since they are broadcast/network addresses)
                    //
                    // - Added exclusion of private, reserved and/or local networks ranges
                    //   unless `allowLocal` is true
                    //
                    // - Added possibility of choosing a custom protocol
                    //
                    // - Add option to validate without protocol
                    //
                    const allowLocal = opts.allowLocal === true || "".concat(opts.allowLocal) === "true";
                    const allowEmptyProtocol = opts.allowEmptyProtocol === true ||
                        "".concat(opts.allowEmptyProtocol) === "true";
                    const protocol = opts.protocol.split(",").join("|").replace(/\s/g, "");
                    const urlExp = new RegExp(
                        `^(?:(?:${protocol})://)${allowEmptyProtocol ? "?" : ""}(?:\\S+(?::\\S*)?@)?(?:${allowLocal
                        ? ""
                        : "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
                        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
                        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})"
                        }(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-?)*[a-z\\u00a1-\\uffff0-9])*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))${
                        allowLocal ? "?" : ""})(?::\\d{2,5})?(?:/[^\\s]*)?$`,
                        "i");
                    return { valid: urlExp.test(input.value) };
                },
            };
        }

        return uri;

    }));
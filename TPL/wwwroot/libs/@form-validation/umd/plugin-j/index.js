(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? factory(require("jquery"), require("@form-validation/core"))
        : typeof define === "function" && define.amd
        ? define(["jquery", "@form-validation/core"], factory)
        : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.$,
            global.FormValidation));
})(this,
    (function($, core) {
        "use strict";

        const version = $.fn.jquery.split(" ")[0].split(".");
        if ((+version[0] < 2 && +version[1] < 9) || (+version[0] === 1 && +version[1] === 9 && +version[2] < 1)) {
            throw new Error("The J plugin requires jQuery version 1.9.1 or higher");
        }
        $.fn["formValidation"] = function(options) {
            const params = arguments;
            return this.each(function() {
                const $this = $(this);
                let data = $this.data("formValidation");
                const opts = "object" === typeof options && options;
                if (!data) {
                    data = core.formValidation(this, opts);
                    $this.data("formValidation", data).data("FormValidation", data);
                }
                if ("string" === typeof options) {
                    data[options].apply(data, Array.prototype.slice.call(params, 1));
                }
            });
        };

    }));
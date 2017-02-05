System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var getTitle;
    return {
        setters: [],
        execute: function () {
            getTitle = function () { return 'from library'; };
            exports_1("default", getTitle);
        }
    };
});

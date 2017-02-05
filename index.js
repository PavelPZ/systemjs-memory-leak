System.register(["./library.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var library_js_1, maxCount, init, count, loadLazies;
    return {
        setters: [
            function (library_js_1_1) {
                library_js_1 = library_js_1_1;
            }
        ],
        execute: function () {
            maxCount = 10000;
            exports_1("init", init = function (withLibrary) {
                document.getElementById('title').innerHTML = 'Used ' + (withLibrary ? library_js_1.default() : 'without library');
                document.getElementById('buttons').innerHTML = '';
                loadLazies(withLibrary);
            });
            count = 0;
            loadLazies = function (withLibrary) {
                var id = withLibrary ? 'lazy-with-lib' : 'lazy-without-lib';
                id = id + '.js?' + count.toString();
                System.import(id).then(function (m) {
                    m.init(count++);
                    System.delete(System.normalizeSync(id));
                    if (count > maxCount)
                        return;
                    setTimeout(function () { return loadLazies(withLibrary); }, 1);
                });
            };
        }
    };
});

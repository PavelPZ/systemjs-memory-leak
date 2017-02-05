System.register(["./library.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var init, count, loadLazies;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            exports_1("init", init = function (withLibrary) {
                document.getElementById('title').innerHTML = 'Used ' + (withLibrary ? 'with library' : 'without library');
                document.getElementById('buttons').innerHTML = '';
                loadLazies(withLibrary);
            });
            count = 0;
            loadLazies = function (withLibrary) {
                //load and delete 
                // - or lazy-with-lib.js (which depends library.js) 
                // - or lazy-without-lib (without any dependencies)
                var id = withLibrary ? 'lazy-with-lib' : 'lazy-without-lib';
                id = id + '.js?' + count.toString();
                //infinite loop: import and delete selected lazy???.js 
                System.import(id).then(function (m) {
                    m.init(count++);
                    System.delete(System.normalizeSync(id));
                    setTimeout(function () { return loadLazies(withLibrary); }, 1);
                });
            };
        }
    };
});

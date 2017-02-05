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
                //correct page title
                document.getElementById('title').innerHTML = 'Used ' + (withLibrary ? 'with library' : 'without library');
                //hide buttons - use Refresh page display them again
                document.getElementById('buttons').innerHTML = '';
                //infinite IMPORT - DELETE loop
                loadLazies(withLibrary);
            });
            count = 0;
            loadLazies = function (withLibrary) {
                //load and delete: 
                // - or lazy-with-lib.js (which depends on library.js) 
                // - or lazy-without-lib (without any dependency)
                var id = withLibrary ? 'lazy-with-lib' : 'lazy-without-lib';
                id = id + '.js?' + count.toString();
                //infinite loop: import and delete lazy??.js 
                System.import(id).then(function (m) {
                    m.init(count++);
                    System.delete(System.normalizeSync(id));
                    setTimeout(function () { return loadLazies(withLibrary); }, 1);
                });
            };
        }
    };
});

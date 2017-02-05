System.register(["./library.js"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var init, count, importDeleteLoop;
    return {
        setters: [
            function (_1) {
            }
        ],
        execute: function () {
            exports_1("init", init = function (withLibrary, scriptLoad, deleteLibrary) {
                //correct page title
                document.getElementById('title').innerHTML = (withLibrary ? 'With' : 'No') + ' dependency, scriptLoad=' + (scriptLoad ? 'true' : 'false') + ', delete  library=' + (deleteLibrary ? 'true' : 'false');
                //hide buttons - use Refresh page to display them again
                document.getElementById('buttons').innerHTML = '';
                //infinite IMPORT - DELETE loop
                importDeleteLoop(withLibrary, deleteLibrary);
            });
            count = 0;
            importDeleteLoop = function (withLibrary, deleteLibrary) {
                //library name with query string
                var id = withLibrary ? 'lazy-with-lib' : 'lazy-without-lib';
                id = id + '.js?' + count.toString();
                //when deleteLibrary==true, import fetched both lazy.js and library.js
                System.import(id).then(function (m) {
                    m.init(count++);
                    System.delete(System.normalizeSync(id));
                    //delete library solves Chrome problem - no memory leak ocured
                    if (deleteLibrary)
                        System.delete(System.normalizeSync('library.js'));
                    setTimeout(function () { return importDeleteLoop(withLibrary, deleteLibrary); }, 1);
                });
            };
        }
    };
});

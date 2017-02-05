import './library.js'; //force import library.js

export const init = (withLibrary: boolean, scriptLoad: boolean, deleteLibrary: boolean) => {
  //correct page title
  document.getElementById('title').innerHTML = (withLibrary ? 'With' : 'No') + ' dependency, scriptLoad=' + (scriptLoad ? 'true' : 'false') + ', delete  library=' + (deleteLibrary ? 'true' : 'false');
  //hide buttons - use Refresh page to display them again
  document.getElementById('buttons').innerHTML = '';
  //infinite IMPORT - DELETE loop
  importDeleteLoop(withLibrary, deleteLibrary);
}

let count = 0;
const importDeleteLoop = (withLibrary: boolean, deleteLibrary: boolean) => {
  //library name with query string
  let id = withLibrary ? 'lazy-with-lib' : 'lazy-without-lib';
  id = id + '.js?' + count.toString();

  //when deleteLibrary==true, import fetched both lazy.js and library.js
  System.import(id).then(m => {
    m.init(count++);
    System.delete(System.normalizeSync(id));
    //delete library solves Chrome problem - no memory leak ocured
    if (deleteLibrary) System.delete(System.normalizeSync('library.js'));
    setTimeout(() => importDeleteLoop(withLibrary, deleteLibrary), 1);
  });
};
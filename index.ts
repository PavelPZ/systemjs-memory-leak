import './library.js'; //force import library.js

export const init = (withLibrary: boolean) => {
  //correct page title
  document.getElementById('title').innerHTML = 'Used ' + (withLibrary ? 'with library' : 'without library');
  //hide buttons - use Refresh page display them again
  document.getElementById('buttons').innerHTML = '';
  //infinite IMPORT - DELETE loop
  loadLazies(withLibrary);
}

let count = 0;
const loadLazies = (withLibrary: boolean) => {
  //load and delete: 
  // - or lazy-with-lib.js (which depends on library.js) 
  // - or lazy-without-lib (without any dependency)
  let id = withLibrary ? 'lazy-with-lib' : 'lazy-without-lib';
  id = id + '.js?' + count.toString();

  //infinite loop: import and delete lazy??.js 
  System.import(id).then(m => {
    m.init(count++);
    System.delete(System.normalizeSync(id));
    setTimeout(() => loadLazies(withLibrary), 1);
  });
};
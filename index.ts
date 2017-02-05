import './library.js'; //force import library.js

export const init = (withLibrary: boolean) => {
  document.getElementById('title').innerHTML = 'Used ' + (withLibrary ? 'with library' : 'without library');
  document.getElementById('buttons').innerHTML = '';
  loadLazies(withLibrary);
}

let count = 0;
const loadLazies = (withLibrary: boolean) => {
  //load and delete 
  // - or lazy-with-lib.js (which depends library.js) 
  // - or lazy-without-lib (without any dependencies)
  let id = withLibrary ? 'lazy-with-lib' : 'lazy-without-lib';
  id = id + '.js?' + count.toString();

  //infinite loop: import and delete selected lazy???.js 
  System.import(id).then(m => {
    m.init(count++);
    System.delete(System.normalizeSync(id));
    setTimeout(() => loadLazies(withLibrary), 1);
  });
};
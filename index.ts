import getTitle from './library.js';

const maxCount = 10000;

export const init = (withLibrary:boolean) => {
  document.getElementById('title').innerHTML = 'Used ' + (withLibrary ? getTitle() : 'without library');
  document.getElementById('buttons').innerHTML = '';
  loadLazies(withLibrary);
}

let count = 0;
const loadLazies = (withLibrary:boolean) => {
  let id = withLibrary ? 'lazy-with-lib' : 'lazy-without-lib';
  id = id + '.js?' + count.toString();
  System.import(id).then(m => {
    m.init(count++);
    System.delete(System.normalizeSync(id));
    if (count > maxCount) return;
    setTimeout(() => loadLazies(withLibrary), 1);
  });
};
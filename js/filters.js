import { renderPictures, destroyPictures } from './pictures.js';
import { shuffle, debounce } from './utils.js';
import { FILTER_ACTIVE_CLASS, FILTER_HIDDEN_CLASS, COUNT_MINIATURES_RANDOM_FILTER, RERENDER_DELAY, Filter } from './consts.js';

const filterContainer = document.querySelector('.img-filters');
const filters = filterContainer.querySelector('.img-filters__form');

let miniatures = null;
let activeFilter = Filter.DEFAULT;

const compareMiniatures = (miniaturesA, miniaturesB) => miniaturesB.comments.length - miniaturesA.comments.length;

const filterFunction = {
  [Filter.DEFAULT]: () => miniatures,
  [Filter.RANDOM]: () => shuffle(miniatures.slice()).slice(0, COUNT_MINIATURES_RANDOM_FILTER),
  [Filter.DISCUSSED]: () => miniatures.slice().sort(compareMiniatures)
};

const onFiltersFormClick = (evt) => {
  const id = evt.target.id;
  if (id && id !== activeFilter) {
    filters.querySelector(`#${activeFilter}`).classList.remove(FILTER_ACTIVE_CLASS);
    evt.target.classList.add(FILTER_ACTIVE_CLASS);
    activeFilter = id;
    destroyPictures();
    renderPictures(filterFunction[id]());
  }
};

const initFilters = (data) => {
  miniatures = data.slice();
  filterContainer.classList.remove(FILTER_HIDDEN_CLASS);
  filters.addEventListener('click', debounce(onFiltersFormClick, RERENDER_DELAY));

  renderPictures(miniatures);
};

export {initFilters};

import { renderThumbnails, renderThumbnailsDebounced, destroyThumbnailsDebounced } from './thumbnails.js';
import { shuffle } from './utils.js';
import { FILTER_ACTIVE_CLASS, FILTER_HIDDEN_CLASS, COUNT_THUMBNAILS_RANDOM_FILTER, Filter } from './consts.js';

const filterContainerElement = document.querySelector('.img-filters');
const filterFormElement = filterContainerElement.querySelector('.img-filters__form');

let thumbnails = null;
let activeFilter = Filter.DEFAULT;

const compareThumbnails = (miniaturesA, miniaturesB) => miniaturesB.comments.length - miniaturesA.comments.length;

const filterFunction = {
  [Filter.DEFAULT]: () => thumbnails,
  [Filter.RANDOM]: () => shuffle(thumbnails.slice()).slice(0, COUNT_THUMBNAILS_RANDOM_FILTER),
  [Filter.DISCUSSED]: () => thumbnails.slice().sort(compareThumbnails)
};

const onFiltersFormClick = (evt) => {
  const id = evt.target.id;
  if (id && id !== activeFilter) {
    filterFormElement.querySelector(`#${activeFilter}`).classList.remove(FILTER_ACTIVE_CLASS);
    evt.target.classList.add(FILTER_ACTIVE_CLASS);
    activeFilter = id;
    destroyThumbnailsDebounced();
    renderThumbnailsDebounced(filterFunction[id]());
  }
};

const initFilters = (data) => {
  thumbnails = data.slice();
  filterContainerElement.classList.remove(FILTER_HIDDEN_CLASS);
  filterFormElement.addEventListener('click', onFiltersFormClick);

  renderThumbnails(thumbnails);
};

export {initFilters};

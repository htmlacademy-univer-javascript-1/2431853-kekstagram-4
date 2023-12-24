import { initFilters } from './filters.js';
import { showAlert } from './utils.js';
import { initEditPopup } from './edit-popup.js';
import { getData } from './api.js';

export const bodyElement = document.querySelector('body');
getData()
  .then((data) => {
    initFilters(data);
  })
  .catch(() => {
    showAlert();
  });

initEditPopup();

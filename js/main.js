import {renderPictures} from './pictures.js';
import {generatePosts} from './data.js';
import {initEditPopup} from './edit-popup.js';

const body = document.querySelector('body');

renderPictures(generatePosts());
initEditPopup();

export {body};

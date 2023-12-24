import { renderBigPicture } from './view-popup.js';
import { debounce } from './utils.js';
import { RERENDER_DELAY } from './consts.js';

const thumbnailTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsContainerElement = document.querySelector('.pictures');
let thumbnails = null;

const onThumbnailsContainerClick = (evt) => {
  const targetElement = evt.target.closest('.picture');
  if (targetElement){
    const id = targetElement.dataset.pictureId;
    const [thumbnail] = thumbnails.filter((picture) => picture.id === +id);
    renderBigPicture(thumbnail);
  }
};

const destroyThumbnails = () => {
  const thumbnailElements = thumbnailsContainerElement.querySelectorAll('.picture');
  thumbnailElements.forEach((miniature) => miniature.remove());
};

const renderThumbnails = (data) => {
  thumbnails = data.slice();
  const thumbnailsListFragment = document.createDocumentFragment();

  thumbnails.forEach( (picture) => {
    const newThumbnail = thumbnailTemplateElement.cloneNode(true);
    newThumbnail.dataset.pictureId = picture.id;
    newThumbnail.querySelector('.picture__img').src = picture.url;
    newThumbnail.querySelector('.picture__img').alt = picture.description;
    newThumbnail.querySelector('.picture__likes').textContent = picture.likes;
    newThumbnail.querySelector('.picture__comments').textContent = picture.comments.length;
    thumbnailsListFragment.appendChild(newThumbnail);
  });

  thumbnailsContainerElement.appendChild(thumbnailsListFragment);
  thumbnailsContainerElement.addEventListener('click', onThumbnailsContainerClick);
};

const renderThumbnailsDebounced = debounce((data) => renderThumbnails(data), RERENDER_DELAY);

const destroyThumbnailsDebounced = debounce(() => destroyThumbnails(), RERENDER_DELAY);

export { renderThumbnails, renderThumbnailsDebounced, destroyThumbnailsDebounced };

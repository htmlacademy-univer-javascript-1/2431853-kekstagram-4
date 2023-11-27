import {renderBigPicture} from './view-popup.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsContainer = document.querySelector('.pictures');
let pictures = null;

const onThumbnailsContainerClick = (evt) => {
  const targetElement = evt.target.closest('.picture');
  if (targetElement){
    const id = targetElement.dataset.pictureId;
    const [thumbnail] = pictures.filter((picture) => picture.id === +id);
    renderBigPicture(thumbnail);
  }
};

const renderPictures = (data) => {
  pictures = data.slice();
  const picturesListFragment = document.createDocumentFragment();

  pictures.forEach( (picture) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.dataset.pictureId = picture.id;
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__img').alt = picture.description;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;
    newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    picturesListFragment.appendChild(newPicture);
  });

  thumbnailsContainer.appendChild(picturesListFragment);
  thumbnailsContainer.addEventListener('click', onThumbnailsContainerClick);
};

export {renderPictures};

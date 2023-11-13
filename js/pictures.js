import {generatePosts} from './data.js';

const pictures = generatePosts();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();

pictures.forEach( (picture) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__img').alt = picture.description;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  picturesListFragment.appendChild(newPicture);
});

const createPictures = () => {
  container.appendChild(picturesListFragment);
};

export {createPictures};

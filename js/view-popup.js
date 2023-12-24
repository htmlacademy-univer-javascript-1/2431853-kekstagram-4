import { isEscapeKey } from './utils.js';
import { bodyElement }  from './main.js';
import { STEP_COMMENTS } from './consts.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseBtnElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const loadBtnElement = bigPictureElement.querySelector('.comments-loader');
let comments = null;
let commentsCounter = STEP_COMMENTS;

const onPopupClose = () => {
  closePopup();
};

const onPopupKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function closePopup (){
  bigPictureElement.classList.add('hidden');

  document.removeEventListener('keydown', onPopupKeydown);
  bigPictureCloseBtnElement.removeEventListener('click',onPopupClose);
  commentsCounter = STEP_COMMENTS;
  loadBtnElement.classList.remove('hidden');
  bodyElement.classList.remove('modal-open');
}

const getCommentTemplate = (comment) => `
    <li class="social__comment">
        <img
            class="social__picture"
            src="${comment.avatar}"
            alt="${comment.name}"
            width="35" height="35">
        <p class="social__text">${comment.message}</p>
    </li>
`;

const renderMainData = (picture) => {
  bigPictureImgElement.src = picture.url;

  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
};

const renderCommentsCount = () => {
  const commentsCounterDiv = `${commentsCounter} из <span class="comments-count">${comments.length}</span> комментариев`;
  commentsCountElement.innerHTML = '';
  commentsCountElement.insertAdjacentHTML('afterbegin', commentsCounterDiv);
};

const renderComments = () => {
  const commentsRender = comments.slice(0, commentsCounter);
  bigPictureElement.querySelector('.social__comments').innerHTML = '';
  bigPictureElement.querySelector('.social__comments').insertAdjacentHTML('afterbegin', commentsRender.map((comment) => getCommentTemplate(comment)).join(''));
};

const adjustCommentCount = () => {
  if (commentsCounter >= comments.length) {
    commentsCounter = comments.length;
    loadBtnElement.classList.add('hidden');
  }
};

const onLoadButtonClick = () => {
  if (commentsCounter < comments.length){
    commentsCounter += STEP_COMMENTS;
  }
  adjustCommentCount();
  renderCommentsCount();
  renderComments();
};

const initComments = () => {
  adjustCommentCount();
  renderCommentsCount();
  renderComments();
  loadBtnElement.addEventListener('click', onLoadButtonClick);
};

const renderBigPicture = (picture) => {
  comments = picture.comments.slice();
  renderMainData(picture);
  initComments();

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onPopupKeydown);
  bigPictureCloseBtnElement.addEventListener('click', onPopupClose);
};

export { renderBigPicture };

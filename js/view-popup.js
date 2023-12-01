import {isEscapeKey} from './utils.js';

const STEP_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseCross = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const loadButton = bigPicture.querySelector('.comments-loader');
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
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onPopupKeydown);
  bigPictureCloseCross.removeEventListener('click',onPopupClose);
  commentsCounter = STEP_COMMENTS;
  loadButton.classList.remove('hidden');
}

const getCommentTemplate = (comment) => `
    <li class="social__comment">
        <img
            class="social__picture"
            src="${comment.avatar}"
            alt="${comment.name}"
            width="35" height="35">
        <p class="social__text">${comment.message.join(' ')}</p>
    </li>
`;

const renderMainData = (picture) => {
  bigPictureImg.src = picture.url;

  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
};

const renderCommentsCount = () => {
  const commentsCounterDiv = `${commentsCounter} из <span class="comments-count">${comments.length}</span> комментариев`;
  commentsCount.innerHTML = '';
  commentsCount.insertAdjacentHTML('afterbegin', commentsCounterDiv);
};

const renderComments = () => {
  const commentsRender = comments.slice(0, commentsCounter);
  bigPicture.querySelector('.social__comments').innerHTML = '';
  bigPicture.querySelector('.social__comments').insertAdjacentHTML('afterbegin', commentsRender.map((comment) => getCommentTemplate(comment)).join(''));
};

const onLoalButtonClick = () => {
  if (commentsCounter < comments.length){
    commentsCounter += STEP_COMMENTS;
  }
  if (commentsCounter >= comments.length) {
    commentsCounter = comments.length;
    loadButton.classList.add('hidden');
  }
  renderCommentsCount();
  renderComments();
};

const initComments = () => {
  renderCommentsCount();
  renderComments();
  loadButton.addEventListener('click', onLoalButtonClick);
};

const renderBigPicture = (picture) => {
  comments = picture.comments.slice();
  renderMainData(picture);
  initComments();

  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onPopupKeydown);
  bigPictureCloseCross.addEventListener('click', onPopupClose);
};

export {renderBigPicture};

import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseCross = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const loadButton = bigPicture.querySelector('.comments-loader');

const onClosePopup = () => {
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
  bigPictureCloseCross.removeEventListener('click',onClosePopup);
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

const renderComments = (picture) => {
  bigPicture.querySelector('.social__comments').innerHTML = '';
  bigPicture.querySelector('.social__comments').insertAdjacentHTML('afterbegin', picture.comments.map((comment) => getCommentTemplate(comment)).join(''));
};

const renderBigPicture = (picture) => {
  renderMainData(picture);
  renderComments(picture);

  bigPicture.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  loadButton.classList.add('hidden');

  document.addEventListener('keydown', onPopupKeydown);
  bigPictureCloseCross.addEventListener('click', onClosePopup);
};

export {renderBigPicture};


// const thumbnailsContainer = document.querySelector('.pictures');
// const bigPicture = document.querySelector('.big-picture');
// const imgPopup = bigPicture.querySelector('.big-picture__img img');
// const likesCount = bigPicture.querySelector('.likes-count');
// const commentsCount = bigPicture.querySelector('.comments-count');


// ```
// <li class="social__comment">
//     <img
//         class="social__picture"
//         src="{{аватар}}"
//         alt="{{имя комментатора}}"
//         width="35" height="35">
//     <p class="social__text">{{текст комментария}}</p>
// </li>
// ```

// const onPopupShow = () => {

// };

// thumbnailsContainer.addEventListener('click', (evt) => {
//   evt.preventDefault();

//   if (evt.target.closest('.picture')) {
//     console.log('Тык');
//   }
// });

// const closeButton = 0;
// const viewPopup = 0;
// const bigPicture = 0;
// const comments = 0;
// const loadButton = 0;


// const getCommentTemplate = ({src, alt, comment}) =>
//   `<li class="social__comment">
//   <img
//       class="social__picture"
//       src="{{аватар}}"
//       alt="{{имя комментатора}}"
//       width="35" height="35">
//   <p class="social__text">{{текст комментария}}</p>
// </li>`;

// const renderMainData = (data) => {

// };
// const renderComments = (data) => {};

// function closeViewPopup() {
//   test.removeEventListener('click', onCloseBtnClick);
// };

// const onDocumentEscKeydown = (evt) => {
//   if(esc) {
//     closeViewPopup();
//   }
// };

// const onCloseBtnClick = () => {
//   closeViewPopup();
// };

// export const openViewPopup = (data) => {
//   renderMainData(data);
//   renderComments(data);
// };

import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const successMessage = body.querySelector('#success').content.querySelector('.success');
const errorMessage = body.querySelector('#error').content.querySelector('.error');

const onMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const onBodyClick = (evt) => {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    hideMessage();
  }
};

const onCloseBtnClick = () => {
  hideMessage();
};

function hideMessage() {
  const message = document.querySelector('.success') || document.querySelector('.error');
  const messageCloseButton = document.querySelector('.success__button') || document.querySelector('.error__button');
  document.removeEventListener('keydown', onMessageKeydown);
  body.removeEventListener('click', onBodyClick);
  messageCloseButton.removeEventListener('click', onCloseBtnClick);
  message.remove();
}

const showMessage = (message, messageCloseButton) => {
  body.append(message);
  document.addEventListener('keydown', onMessageKeydown);
  body.addEventListener('click', onBodyClick);
  body.querySelector(messageCloseButton).addEventListener('click', onCloseBtnClick);
};

const showSuccessMessage = () => showMessage(successMessage, '.success__button');

const showErrorMessage = () => showMessage(errorMessage, '.error__button');

export {showSuccessMessage, showErrorMessage};

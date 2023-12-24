import { isEscapeKey } from './utils.js';
import { MESSAGE_Z_INDEX } from './consts.js';

const bodyElement = document.querySelector('body');
const successMessageElement = bodyElement.querySelector('#success').content.querySelector('.success');
const errorMessageElement = bodyElement.querySelector('#error').content.querySelector('.error');

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
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  const messageCloseButtonElement = document.querySelector('.success__button') || document.querySelector('.error__button');
  document.removeEventListener('keydown', onMessageKeydown);
  bodyElement.removeEventListener('click', onBodyClick);
  messageCloseButtonElement.removeEventListener('click', onCloseBtnClick);
  messageElement.remove();
}

const showMessage = (message, messageCloseButton) => {
  message.style.zIndex = `${MESSAGE_Z_INDEX}`;
  bodyElement.append(message);
  document.addEventListener('keydown', onMessageKeydown);
  bodyElement.addEventListener('click', onBodyClick);
  bodyElement.querySelector(messageCloseButton).addEventListener('click', onCloseBtnClick);
};

const showSuccessMessage = () => showMessage(successMessageElement, '.success__button');

const showErrorMessage = () => showMessage(errorMessageElement, '.error__button');

export { showSuccessMessage, showErrorMessage };

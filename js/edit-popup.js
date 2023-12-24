import { isEscapeKey } from './utils.js';
import { bodyElement } from './main.js';
import { REGEX_HASHTAG, MAX_COUNT_HASHTAG, MAX_COUNT_LENGTH_DESCRIPTION, FILE_TYPES, ErrorText } from './consts.js';
import { initScaleControl, destroyScaleControl } from './scale.js';
import { initSlider, destroySlider } from './effect.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './upload-message.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const popupElement = uploadFormElement.querySelector('.img-upload__overlay');
const hashtagsFieldElement = uploadFormElement.querySelector('.img-upload__field-wrapper input');
const descriptionFieldElement = uploadFormElement.querySelector('.img-upload__field-wrapper textarea');
const pictureInputElement = uploadFormElement.querySelector('.img-upload__input');
const closePopupBtnElement = uploadFormElement.querySelector('.img-upload__cancel');
const submitBtnElement = uploadFormElement.querySelector('.img-upload__submit');
const uploadPicturePreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const effectPreviewElements = uploadFormElement.querySelectorAll('.effects__preview');

let pristine = null;

const getHashtagsArray = (hashtags) => hashtags.toLowerCase().trim().split(' ').filter((tag) => Boolean(tag.length));

const validateHashtagsCount = (hashtags) => getHashtagsArray(hashtags).length <= MAX_COUNT_HASHTAG;

const validateHashtagsRepeat = (hashtags) => {
  const hashtagArray = getHashtagsArray(hashtags);
  const uniqueHashtags = new Set(hashtagArray);

  return uniqueHashtags.size === hashtagArray.length;
};

const validateHashtags = (hashtags) => getHashtagsArray(hashtags).every((element) => REGEX_HASHTAG.test(element));

const validateDescription = (discription) => discription.length <= MAX_COUNT_LENGTH_DESCRIPTION;

const initValidators = () => {
  pristine = new Pristine(uploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(hashtagsFieldElement, validateHashtags, ErrorText.INVALID_PATTERN, 1, true);
  pristine.addValidator(hashtagsFieldElement, validateHashtagsRepeat, ErrorText.NOT_UNIQUE, 2, true);
  pristine.addValidator(hashtagsFieldElement, validateHashtagsCount, ErrorText.INVALID_COUNT, 3, true);
  pristine.addValidator(descriptionFieldElement, validateDescription, ErrorText.INVALID_LENGTH, true);
};

const isInputFormElement = (element) => element === hashtagsFieldElement || element === descriptionFieldElement;

const onPopupClose = () => {
  closePopup();
};

const onPopupKeydown = (evt) => {
  const focusedElement = document.activeElement;

  if (isEscapeKey(evt) && !isInputFormElement(focusedElement)) {
    evt.preventDefault();
    closePopup();
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    submitBtnElement.disabled = true;
    sendData(new FormData(evt.target))
      .then(closePopup)
      .then(showSuccessMessage)
      .catch(() => {
        showErrorMessage();
      }
      )
      .finally(() => {
        submitBtnElement.disabled = false;
      });
  }
};

function closePopup() {
  popupElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  pristine.destroy();
  destroyScaleControl();
  destroySlider();
  uploadFormElement.reset();

  document.removeEventListener('keydown', onPopupKeydown);
  closePopupBtnElement.removeEventListener('click', onPopupClose);
  uploadFormElement.removeEventListener('submit', onFormSubmit);
}

const isFileImage = (file) => FILE_TYPES.includes(file);

const initPreviewImage = (file) => {
  uploadPicturePreviewElement.src = URL.createObjectURL(file);
  effectPreviewElements.forEach((picture) => {
    picture.style.backgroundImage = `url('${uploadPicturePreviewElement.src}')`;
  });
};

const onPictureInputChange = () => {
  const selectedFile = pictureInputElement.files[0];
  if (isFileImage(selectedFile.type)) {
    initScaleControl();
    initValidators();
    initSlider();
    initPreviewImage(selectedFile);

    bodyElement.classList.add('modal-open');
    popupElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupKeydown);
    closePopupBtnElement.addEventListener('click', onPopupClose);
    uploadFormElement.addEventListener('submit', onFormSubmit);
  }
};

const initEditPopup = () => {
  pictureInputElement.addEventListener('change', onPictureInputChange);
};

export {initEditPopup};

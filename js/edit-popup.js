import {isEscapeKey} from './utils.js';
import {body} from './main.js';
import {REDEX_HASHTAG, MAX_COUNT_HASHTAG, MAX_COUNT_LENGTH_DISCRIPTION, FILE_TYPES, ErrorText} from './consts.js';
import {initScaleControl, destroyScaleControl} from './scale.js';
import {initSlider, destroySlider} from './effect.js';
import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './upload-message.js';

const uploadForm = document.querySelector('.img-upload__form');
const popup = uploadForm.querySelector('.img-upload__overlay');
const hashtagsField = uploadForm.querySelector('.img-upload__field-wrapper input');
const discriptionField = uploadForm.querySelector('.img-upload__field-wrapper textarea');
const pictureInput = uploadForm.querySelector('.img-upload__input');
const closePopupBtn = uploadForm.querySelector('.img-upload__cancel');
const submitBtn = uploadForm.querySelector('.img-upload__submit');

let pristine = null;

const getHashtagsArray = (hashtags) => hashtags.toLowerCase().trim().split(' ').filter((tag) => Boolean(tag.length));

const validateHashtagsCount = (hashtags) => getHashtagsArray(hashtags).length <= MAX_COUNT_HASHTAG;

const validateHashtagsRepeat = (hashtags) => {
  const hashtagArray = getHashtagsArray(hashtags);
  const uniqueHashtags = new Set(hashtagArray);

  return uniqueHashtags.size === hashtagArray.length;
};

const validateHashtags = (hashtags) => getHashtagsArray(hashtags).every((element) => REDEX_HASHTAG.test(element));

const validateDiscription = (discription) => discription.length <= MAX_COUNT_LENGTH_DISCRIPTION;

const initValidators = () => {
  pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(hashtagsField, validateHashtags, ErrorText.INVALID_PATTERN, 1, true);
  pristine.addValidator(hashtagsField, validateHashtagsRepeat, ErrorText.NOT_UNIQUE, 2, true);
  pristine.addValidator(hashtagsField, validateHashtagsCount, ErrorText.INVALID_COUNT, 3, true);
  pristine.addValidator(discriptionField, validateDiscription, ErrorText.INVALID_LENGTH, true);
};

const isInputFormElement = (element) => element === hashtagsField || element === discriptionField;

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
    submitBtn.disabled = true;
    sendData(new FormData(evt.target))
      .then(closePopup)
      .then(showSuccessMessage)
      .catch(() => {
        showErrorMessage();
      }
      )
      .finally(() => {
        submitBtn.disabled = false;
      });
  }
};

function closePopup() {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');

  pristine.destroy();
  destroyScaleControl();
  destroySlider();
  uploadForm.reset();

  document.removeEventListener('keydown', onPopupKeydown);
  closePopupBtn.removeEventListener('click', onPopupClose);
  uploadForm.removeEventListener('submit', onFormSubmit);
}

const isFileImage = (file) => FILE_TYPES.includes(file);

const onPictureInputChange = () => {
  if (isFileImage(pictureInput.files[0].type)) {
    initScaleControl();
    initValidators();
    initSlider();

    body.classList.add('modal-open');
    popup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupKeydown);
    closePopupBtn.addEventListener('click', onPopupClose);
    uploadForm.addEventListener('submit', onFormSubmit);
  }
};

const initEditPopup = () => {
  pictureInput.addEventListener('change', onPictureInputChange);
};

export {initEditPopup};

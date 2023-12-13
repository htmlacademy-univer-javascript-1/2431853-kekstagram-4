import {isEscapeKey} from './utils.js';
import {body} from './main.js';
import {initScaleControl, destroyScaleControl} from './scale.js';
import {initSlider, destroySlider} from './effect.js';

const REDEX_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/;
const MAX_COUNT_HASHTAG = 5;
const MAX_COUNT_LENGTH_DISCRIPTION = 140;
const FILE_TYPES = ['image/jpeg', 'image/pjpeg', 'image/png'];

const uploadForm = document.querySelector('.img-upload__form');
const popup = uploadForm.querySelector('.img-upload__overlay');
const hashtagsField = uploadForm.querySelector('.img-upload__field-wrapper input');
const discriptionField = uploadForm.querySelector('.img-upload__field-wrapper textarea');
const pictureInput = uploadForm.querySelector('.img-upload__input');
const closePopupBtn = uploadForm.querySelector('.img-upload__cancel');

let pristine = null;

const validateHashtags = (hashtags) => {
  if (hashtags.length > 0) {
    const hashtagArray = hashtags.toLowerCase().split(' ');

    const uniqueHashtags = new Set(hashtagArray);
    if (uniqueHashtags.size !== hashtagArray.length) {
      return false;
    }

    if (hashtagArray.length <= MAX_COUNT_HASHTAG) {
      const validHashtags = hashtagArray.every((element) => REDEX_HASHTAG.test(element));
      if (!validHashtags) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
};


const validateDiscription = (discription) => discription.length <= MAX_COUNT_LENGTH_DISCRIPTION;

const initValidators = () => {
  pristine = new Pristine(uploadForm);

  pristine.addValidator(hashtagsField, validateHashtags);
  pristine.addValidator(discriptionField, validateDiscription);
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
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

function closePopup (){
  pictureInput.value = '';
  popup.classList.add('hidden');
  body.classList.remove('modal-open');

  pristine.destroy();
  destroyScaleControl();
  destroySlider();

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

import {isEscapeKey} from './utils.js';
import {body} from './main.js';

const REDEX_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/;
const MAX_COUNT_HASHTAG = 5;
const MAX_COUNT_LENGTH_DISCRIPTION = 140;
const FILE_TYPES = ['image/jpeg', 'image/pjpeg', 'image/png'];

const uploadForm = document.querySelector('.img-upload__form');
const popup = uploadForm.querySelector('.img-upload__overlay');
const uploadPicturePreview = uploadForm.querySelector('.img-upload__preview img');
const hashtagsField = uploadForm.querySelector('.img-upload__field-wrapper input');
const discriptionField = uploadForm.querySelector('.img-upload__field-wrapper textarea');
const scaleControlSmallerBtn = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBiggerBtn = uploadForm.querySelector('.scale__control--bigger');
const scaleControlInput = uploadForm.querySelector('.scale__control--value');
const pictureInput = uploadForm.querySelector('.img-upload__input');
const closePopupBtn = uploadForm.querySelector('.img-upload__cancel');

const pristine = new Pristine(uploadForm);

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

pristine.addValidator(hashtagsField, validateHashtags);
pristine.addValidator(discriptionField, validateDiscription);

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

const onSmallerBtnClick = () => {
  let scaleValue = Number(scaleControlInput.value.slice(0, -1));
  if (scaleValue > 25) {
    scaleValue -= 25;
    scaleControlInput.value = `${scaleValue}%`;
    uploadPicturePreview.style.transform = `scale(${scaleValue / 100})`;
  }
};

const onBiggerBtnClick = () => {
  let scaleValue = Number(scaleControlInput.value.slice(0, -1));
  if (scaleValue < 100) {
    scaleValue += 25;
    scaleControlInput.value = `${scaleValue}%`;
    uploadPicturePreview.style.transform = `scale(${scaleValue / 100})`;
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

  document.removeEventListener('keydown', onPopupKeydown);
  closePopupBtn.removeEventListener('click', onPopupClose);
  scaleControlSmallerBtn.removeEventListener('click', onSmallerBtnClick);
  scaleControlBiggerBtn.removeEventListener('click', onBiggerBtnClick);
  uploadForm.removeEventListener('submit', onFormSubmit);
}

const initScaleControl = () => {
  scaleControlInput.value = '100%';
  scaleControlSmallerBtn.addEventListener('click', onSmallerBtnClick);
  scaleControlBiggerBtn.addEventListener('click', onBiggerBtnClick);
};

const isFileImage = (file) => FILE_TYPES.includes(file);

const onPictureInputChange = () => {
  if (isFileImage(pictureInput.files[0].type)) {
    initScaleControl();
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

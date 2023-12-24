import { SCALE_FACTOR, SCALE_STEP, ScaleValue } from './consts.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadPicturePreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const scaleControlSmallerBtnElement = uploadFormElement.querySelector('.scale__control--smaller');
const scaleControlBiggerBtnElement = uploadFormElement.querySelector('.scale__control--bigger');
const scaleControlInputElement = uploadFormElement.querySelector('.scale__control--value');

const onScaleControlSmallerBtnClick = () => {
  let scaleValue = Number(scaleControlInputElement.value.slice(0, -1));
  if (scaleValue > ScaleValue.MIN) {
    scaleValue -= SCALE_STEP;
    scaleControlInputElement.value = `${scaleValue}%`;
    uploadPicturePreviewElement.style.transform = `scale(${scaleValue * SCALE_FACTOR})`;
  }
};

const onScaleControlBiggerBtnClick = () => {
  let scaleValue = Number(scaleControlInputElement.value.slice(0, -1));
  if (scaleValue < ScaleValue.MAX) {
    scaleValue += SCALE_STEP;
    scaleControlInputElement.value = `${scaleValue}%`;
    uploadPicturePreviewElement.style.transform = `scale(${scaleValue * SCALE_FACTOR})`;
  }
};

const destroyScaleControl = () => {
  scaleControlSmallerBtnElement.removeEventListener('click', onScaleControlSmallerBtnClick);
  scaleControlBiggerBtnElement.removeEventListener('click', onScaleControlBiggerBtnClick);
  uploadPicturePreviewElement.style.transform = '';
};

const initScaleControl = () => {
  scaleControlInputElement.value = `${ScaleValue.MAX}%`;
  scaleControlSmallerBtnElement.addEventListener('click', onScaleControlSmallerBtnClick);
  scaleControlBiggerBtnElement.addEventListener('click', onScaleControlBiggerBtnClick);
};

export { destroyScaleControl, initScaleControl };

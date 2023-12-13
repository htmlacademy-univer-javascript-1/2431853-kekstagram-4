import { SCALE_FACTOR, SCALE_STEP, ScaleValue } from './consts.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadPicturePreview = uploadForm.querySelector('.img-upload__preview img');
const scaleControlSmallerBtn = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBiggerBtn = uploadForm.querySelector('.scale__control--bigger');
const scaleControlInput = uploadForm.querySelector('.scale__control--value');

const onSmallerBtnClick = () => {
  let scaleValue = Number(scaleControlInput.value.slice(0, -1));
  if (scaleValue > ScaleValue.MIN) {
    scaleValue -= SCALE_STEP;
    scaleControlInput.value = `${scaleValue}%`;
    uploadPicturePreview.style.transform = `scale(${scaleValue * SCALE_FACTOR})`;
  }
};

const onBiggerBtnClick = () => {
  let scaleValue = Number(scaleControlInput.value.slice(0, -1));
  if (scaleValue < ScaleValue.MAX) {
    scaleValue += SCALE_STEP;
    scaleControlInput.value = `${scaleValue}%`;
    uploadPicturePreview.style.transform = `scale(${scaleValue * SCALE_FACTOR})`;
  }
};

const destroyScaleControl = () => {
  scaleControlSmallerBtn.removeEventListener('click', onSmallerBtnClick);
  scaleControlBiggerBtn.removeEventListener('click', onBiggerBtnClick);
  uploadPicturePreview.style.transform = '';
};

const initScaleControl = () => {
  scaleControlInput.value = `${ScaleValue.MAX}%`;
  scaleControlSmallerBtn.addEventListener('click', onSmallerBtnClick);
  scaleControlBiggerBtn.addEventListener('click', onBiggerBtnClick);
};

export {destroyScaleControl, initScaleControl};

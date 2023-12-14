import {Effects} from './consts.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadPicturePreview = uploadForm.querySelector('.img-upload__preview img');
const effects = uploadForm.querySelector('.effects');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const slider = uploadForm.querySelector('.effect-level__slider');
const effectLevel = uploadForm.querySelector('.effect-level__value');

let currentEffect = null;

const updatePictureStyle = () => {
  if (currentEffect === Effects.DEFAULT) {
    uploadPicturePreview.style.filter = null;
  } else {
    const value = effectLevel.value;
    const style = currentEffect.style;
    const unit = currentEffect.unit;
    uploadPicturePreview.style.filter = `${style}(${value}${unit})`;
  }
};

const onSliderUpdate = () => {
  effectLevel.value = slider.noUiSlider.get();
  updatePictureStyle();
};

const createSlider = (effect) => {
  noUiSlider.create(slider, {
    range: {
      min: effect.min,
      max: effect.max,
    },
    step: effect.step,
    start: effect.start,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  slider.noUiSlider.on('update', onSliderUpdate);
  sliderContainer.classList.add('hidden');
};

const updateSlider = () => {
  if (currentEffect === Effects.DEFAULT) {
    sliderContainer.classList.add('hidden');
  } else {
    slider.noUiSlider.updateOptions({
      range: {
        min: currentEffect.min,
        max: currentEffect.max
      },
      start: currentEffect.start,
      step: currentEffect.step
    });
    sliderContainer.classList.remove('hidden');
  }
};

const onEffectChange = (evt) => {
  const changedEffect = evt.target.value.toUpperCase();
  if (changedEffect in Effects) {
    currentEffect = Effects[changedEffect];
  } else {
    currentEffect = Effects.DEFAULT;
  }
  updateSlider();
  updatePictureStyle();
};

const destroySlider = () => {
  slider.noUiSlider.destroy();
  effects.removeEventListener('change', onEffectChange);
  uploadPicturePreview.style.filter = '';

};

const initSlider = () => {
  currentEffect = Effects.DEFAULT;
  createSlider(currentEffect);
  effects.addEventListener('change', onEffectChange);
};

export {initSlider, destroySlider};

import { Effect } from './consts.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadPicturePreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const effectFieldsetElement = uploadFormElement.querySelector('.effects');
const sliderContainerElement = uploadFormElement.querySelector('.img-upload__effect-level');
const sliderElement = uploadFormElement.querySelector('.effect-level__slider');
const effectLevelElement = uploadFormElement.querySelector('.effect-level__value');

let currentEffect = null;

const updatePictureStyle = () => {
  if (currentEffect === Effect.DEFAULT) {
    uploadPicturePreviewElement.style.filter = null;
  } else {
    const value = effectLevelElement.value;
    const style = currentEffect.style;
    const unit = currentEffect.unit;
    uploadPicturePreviewElement.style.filter = `${style}(${value}${unit})`;
  }
};

const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  updatePictureStyle();
};

const createSlider = (effect) => {
  noUiSlider.create(sliderElement, {
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
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  sliderContainerElement.classList.add('hidden');
};

const updateSlider = () => {
  if (currentEffect === Effect.DEFAULT) {
    sliderContainerElement.classList.add('hidden');
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: currentEffect.min,
        max: currentEffect.max
      },
      start: currentEffect.start,
      step: currentEffect.step
    });
    sliderContainerElement.classList.remove('hidden');
  }
};

const onEffectFieldsetChange = (evt) => {
  const changedEffect = evt.target.value.toUpperCase();
  if (changedEffect in Effect) {
    currentEffect = Effect[changedEffect];
  } else {
    currentEffect = Effect.DEFAULT;
  }
  updateSlider();
  updatePictureStyle();
};

const destroySlider = () => {
  sliderElement.noUiSlider.destroy();
  effectFieldsetElement.removeEventListener('change', onEffectFieldsetChange);
  uploadPicturePreviewElement.style.filter = '';
};

const initSlider = () => {
  currentEffect = Effect.DEFAULT;
  createSlider(currentEffect);
  effectFieldsetElement.addEventListener('change', onEffectFieldsetChange);
};

export {initSlider, destroySlider};

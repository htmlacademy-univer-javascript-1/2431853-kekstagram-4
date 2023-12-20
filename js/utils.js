const generateRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = () => {
  const alert = document.querySelector('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left= '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.style.lineHeight = '28px';
  alert.textContent = 'Не удалось загрузить данные.Попробуйте обновить страницу';
  document.body.append(alert);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {generateRandomNumber, shuffle, isEscapeKey, showAlert, debounce};

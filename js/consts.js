const COUNT_POSTS = 25;
const SCALE_STEP = 25;
const SCALE_FACTOR = 0.01;
const REDEX_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/;
const MAX_COUNT_HASHTAG = 5;
const MAX_COUNT_LENGTH_DISCRIPTION = 140;
const FILE_TYPES = ['image/jpeg', 'image/pjpeg', 'image/png'];

const AvatarId = {
  MIN: 1,
  MAX: 6,
};

const MessageCount = {
  MIN: 1,
  MAX: 2,
};

const CommentsCount = {
  MIN: 0,
  MAX: 30,
};

const LikesCount = {
  MIN: 15,
  MAX: 200,
};

const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Анна',
  'Виктор',
  'Александр',
  'Наталья',
  'Артемий',
  'Евангелина',
  'Владимир',
  'Анастасия',
  'Егор',
  'Дарья'
];

const ScaleValue = {
  MIN: 25,
  MAX: 100,
};

const Effects = {
  DEFAULT: {
    style: 'none',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '',
  },
  CHROME: {
    style: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  SEPIA: {
    style: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  MARVIN: {
    style: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%',
  },
  PHOBOS: {
    style: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px',
  },
  HEAT: {
    style: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: '',
  },
};

export {COUNT_POSTS, AvatarId, MessageCount, CommentsCount, LikesCount, MESSAGES, NAMES, SCALE_STEP, SCALE_FACTOR, ScaleValue, Effects, REDEX_HASHTAG, MAX_COUNT_HASHTAG, MAX_COUNT_LENGTH_DISCRIPTION, FILE_TYPES};

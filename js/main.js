const MIN_INDEX_AVATAR = 1;
const MAX_INDEX_AVATAR = 6;
const COUNT_POSTS = 25;
const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 30;

const messages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
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

const createGenerateId = () => {
  let id = 0;
  return () => {
    id++;
    return id;
  };
};

const generateRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const generateComments = (countComments) => {
  const result = [];
  const generateIdcomments = createGenerateId();
  for (let i = 0; i < countComments; i++) {
    const comment = {
      id: generateIdcomments(),
      avatar: `img/avatar-${generateRandomNumber(MIN_INDEX_AVATAR, MAX_INDEX_AVATAR)}.svg`,
      message: messages[generateRandomNumber(0, messages.length - 1)],
      name: names[generateRandomNumber(0, names.length - 1)],
    };
    result[i] = comment;
  }

  return result;
};

const generatePosts = () => {
  const result = [];
  const generateIdPhotos = createGenerateId();

  for (let i = 0; i < COUNT_POSTS; i++){
    const id = generateIdPhotos();
    const photo = {
      id: id,
      url: `photos/${id}.jpg`,
      description: `Изображение с идентификатором ${id}`,
      likes: generateRandomNumber(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
      comments: generateComments(generateRandomNumber(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS))
    };
    result[i] = photo;
  }

  return result;
};

generatePosts();

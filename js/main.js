const COUNT_POSTS = 25;

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

const getComment = (_, id) => {
  const comment = {
    id,
    avatar: `img/avatar-${generateRandomNumber(AvatarId.MIN, AvatarId.MAX)}.svg`,
    message: shuffle(MESSAGES).slice(0, generateRandomNumber(MessageCount.MIN, MessageCount.MAX)),//MESSAGES[generateRandomNumber(0, MESSAGES.length - 1)],
    name: NAMES[generateRandomNumber(0, NAMES.length - 1)],
  };

  return comment;
};

const getPost = (_, id) => {
  id++;
  const photo = {
    id,
    url: `photos/${id}.jpg`,
    description: `Изображение с идентификатором ${id}`,
    likes: generateRandomNumber(LikesCount.MIN, LikesCount.MAX),
    comments: Array.from( {length: generateRandomNumber(CommentsCount.MIN, CommentsCount.MAX)}, getComment)
  };

  return photo;
};

const generatePosts = () => Array.from({length: COUNT_POSTS}, getPost);

generatePosts();

import { COUNT_THUMBNAILS, AvatarId, MessageCount, CommentsCount, LikesCount, MESSAGES, NAMES } from './consts.js';
import { generateRandomNumber, shuffle } from './utils.js';

const getComment = (_, id) => {
  const comment = {
    id,
    avatar: `img/avatar-${generateRandomNumber(AvatarId.MIN, AvatarId.MAX)}.svg`,
    message: shuffle(MESSAGES).slice(0, generateRandomNumber(MessageCount.MIN, MessageCount.MAX)),
    name: NAMES[generateRandomNumber(0, NAMES.length - 1)],
  };

  return comment;
};

const getThumbnail = (_, id) => {
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

const generateThumbnails = () => Array.from({length: COUNT_THUMBNAILS}, getThumbnail);

export { generateThumbnails };

'use strict';

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var mockComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var mockNames = [
  'Иван',
  'Артем',
  'Тамара',
  'Роберт',
  'Инга',
  'Малефисента',
  'Татьяна',
  'Елизаветта'
];

var getPhotoDescription = function () {
  var mockPhotoDescription = {};
  var photoNumber = randomInteger(1, 25);

  mockPhotoDescription.url = 'photos/' + photoNumber + '.jpg';

  mockPhotoDescription.likes = randomInteger(15, 200);

  var numberOfComments = randomInteger(1, mockComments.length);
  var comments = [];
  for (var i = 0; i < numberOfComments; i++) {
    comments[i] = {};
    comments[i].avatar = 'img/avatar-' + randomInteger(1, 6) + '.svg';
    comments[i].message = mockComments[randomInteger(0, mockComments.length - 1)];
    comments[i].name = mockNames[randomInteger(0, mockNames.length - 1)];
  }
  mockPhotoDescription.comments = comments;

  return mockPhotoDescription;
};

var CARDS_OF_NUMBERS = 25;

var userPhotoList = [];
for (var j = 0; j < CARDS_OF_NUMBERS; j++) {
  userPhotoList[j] = getPhotoDescription();
}

var picturesContainer = document.querySelector('.pictures');
var pictureDescriptionTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPictureDescription = function (picture) {
  var pictureDescriptionElement = pictureDescriptionTemplate.cloneNode(true);
  pictureDescriptionElement.querySelector('.picture__img').src = picture.url;
  pictureDescriptionElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureDescriptionElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureDescriptionElement;
};

var fragment = document.createDocumentFragment();
for (var b = 0; b < CARDS_OF_NUMBERS; b++) {
  fragment.appendChild(renderPictureDescription(userPhotoList[b]));
}

picturesContainer.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var mainPhotoCard = userPhotoList[0];

document.querySelector('.big-picture__img').children[0].src = mainPhotoCard.url;
document.querySelector('.likes-count').textContent = mainPhotoCard.likes;
document.querySelector('.comments-count').textContent = mainPhotoCard.comments.length;

var commentsList = document.querySelector('.social__comments');
var renderComments = function (picture) {
  var renderCommentsElement = document.querySelector('.social__comment').cloneNode(true);
  renderCommentsElement.querySelector('.social__picture').src = picture.avatar;
  renderCommentsElement.querySelector('.social__text').textContent = picture.message;

  return renderCommentsElement;
};

for (var c = 0; c < mainPhotoCard.comments.length; c++) {
  fragment.appendChild(renderComments(mainPhotoCard.comments[c]));
}
commentsList.appendChild(fragment);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

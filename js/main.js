'use strict';

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

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

var userPhotoList = [];
for (var j = 0; j < 25; j++) {
  userPhotoList[j] = getPhotoDescription();
}

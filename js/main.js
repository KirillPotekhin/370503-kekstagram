'use strict';

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var usersComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var names = [
  'Иван',
  'Артем',
  'Тамара',
  'Роберт',
  'Инга',
  'Малефисента',
  'Татьяна',
  'Елизаветта'
];

var getPhotoDescription = function (photoNumber) {
  var photoDescription = {};

  photoDescription.url = 'photos/' + photoNumber + '.jpg';

  photoDescription.likes = getRandomNumber(15, 200);

  var numberOfComments = getRandomNumber(1, usersComments.length);
  var comments = [];
  for (var i = 0; i < numberOfComments; i++) {
    comments[i] = {};
    comments[i].avatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    comments[i].message = usersComments[getRandomNumber(0, usersComments.length - 1)];
    comments[i].name = names[getRandomNumber(0, names.length - 1)];
  }
  photoDescription.comments = comments;

  return photoDescription;
};

var CARDS_OF_NUMBERS = 25;

var usersPhotos = [];
for (var j = 0; j < CARDS_OF_NUMBERS; j++) {
  usersPhotos[j] = getPhotoDescription(j + 1);
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
for (var k = 0; k < CARDS_OF_NUMBERS; k++) {
  fragment.appendChild(renderPictureDescription(usersPhotos[k]));
}

picturesContainer.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

var imgUploadForm = document.querySelector('.img-upload__form');
var imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');

var ESC_KEYCODE = 27;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    imgUploadOverlay.classList.add('hidden');
    imgUploadForm.reset();
  }
};

var openPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

imgUploadInput.onchange = function () {
  openPopup();

  imgUploadCancel.addEventListener('click', function () {
    closePopup();
  });
};

var effectsList = document.querySelector('.effects__list');
var effectsPreview = effectsList.querySelectorAll('.effects__preview');
var imgUploadPreviewWrapper = document.querySelector('.img-upload__preview');
var imgUploadPreview = imgUploadPreviewWrapper.querySelector('img');

var effects = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

var addOnImgUploadPreviewClick = function (effectPreview, effect) {
  effectPreview.addEventListener('click', function () {
    imgUploadPreview.className = '';
    imgUploadPreview.classList.add(effect);
  });
};

for (var i = 0; i < effectsPreview.length; i++) {
  addOnImgUploadPreviewClick(effectsPreview[i], effects[i]);
}

var onBifFotoPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    bigPicture.classList.add('hidden');
  }
};

var openBifFotoPopup = function () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBifFotoPopupEscPress);
};

var closeBifFotoPopup = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBifFotoPopupEscPress);
};

var usersPictures = picturesContainer.querySelectorAll('.picture');
var addOnUsersPhotoClick = function (userPicture, userPhoto) {
  return userPicture.addEventListener('click', function () {
    openBifFotoPopup();
    bigPictureClose.addEventListener('click', function () {
      closeBifFotoPopup();
    });
    var mainPhotoCard = userPhoto;

    document.querySelector('.big-picture__img').children[0].src = mainPhotoCard.url;
    document.querySelector('.likes-count').textContent = mainPhotoCard.likes;
    document.querySelector('.comments-count').textContent = mainPhotoCard.comments.length;

    var commentsList = document.querySelector('.social__comments');
    var commentsItems = commentsList.querySelectorAll('.social__comment');
    var renderComments = function (picture) {
      var renderCommentsElement = document.querySelector('.social__comment').cloneNode(true);
      renderCommentsElement.querySelector('.social__picture').src = picture.avatar;
      renderCommentsElement.querySelector('.social__text').textContent = picture.message;

      return renderCommentsElement;
    };

    for (var l = 0; l < mainPhotoCard.comments.length; l++) {
      fragment.appendChild(renderComments(mainPhotoCard.comments[l]));
    }

    for (var m = 0; m < commentsItems.length; m++) {
      commentsList.removeChild(commentsItems[m]);
    }

    commentsList.appendChild(fragment);
  });
};

for (var p = 0; p < usersPictures.length; p++) {
  addOnUsersPhotoClick(usersPictures[p], usersPhotos[p]);
}

var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelLine = imgUploadEffectLevel.querySelector('.effect-level__line');
var effectLevelPin = imgUploadEffectLevel.querySelector('.effect-level__pin');

var getCssProperty = function (element, property) {
  var elem = element;
  return window.getComputedStyle(elem, null).getPropertyValue(property);
};

effectLevelPin.addEventListener('mouseup', function () {
  var effectLevelLineWidth = effectLevelLine.offsetWidth;
  var leftPositionPin = parseInt(getCssProperty(effectLevelPin, 'left'), 10);
  var pinValue = leftPositionPin / effectLevelLineWidth;

  return pinValue;
});

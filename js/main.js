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
var ENTER_KEYCODE = 13;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== document.activeElement) {
    imgUploadOverlay.classList.add('hidden');
    imgUploadForm.reset();
  }
};

var onPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
  }
};

var openPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);

  document.addEventListener('keydown', onPopupEnterPress);
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

var imgUploadScale = document.querySelector('.scale');
var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');


var effectsList = document.querySelector('.effects__list');
var effectsPreview = effectsList.querySelectorAll('.effects__preview');
var imgUploadPreviewWrapper = document.querySelector('.img-upload__preview');
var imgUploadPreview = imgUploadPreviewWrapper.querySelector('img');

var effectsClasses = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];


var effects = [
  {
    name: 'none',
    type: 'none',
    max: 0,
    min: 0,
    units: ''
  },
  {
    name: 'chrome',
    type: 'grayscale',
    max: 1,
    min: 0,
    units: ''
  },
  {
    name: 'sepia',
    type: 'sepia',
    max: 1,
    min: 0,
    units: ''
  },
  {
    name: 'marvin',
    type: 'invert',
    max: 100,
    min: 0,
    units: '%'
  },
  {
    name: 'phobos',
    type: 'blur',
    max: 3,
    min: 0,
    units: 'px'
  },
  {
    name: 'heat',
    type: 'brightness',
    max: 3,
    min: 1,
    units: ''
  }
];

var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelLine = imgUploadEffectLevel.querySelector('.effect-level__line');
var effectLevelPin = imgUploadEffectLevel.querySelector('.effect-level__pin');
var effectLevelDepth = imgUploadEffectLevel.querySelector('.effect-level__depth');
var currentFilterType = {};

var addOnImgUploadPreviewClick = function (effectPreview, effectClass, effect) {
  effectPreview.addEventListener('click', function () {
    imgUploadPreview.className = '';
    currentFilterType = effect;
    addFilterOnImg(1);
    effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
    effectLevelDepth.style.width = effectLevelLine.offsetWidth + 'px';
    imgUploadPreview.classList.add(effectClass);
  });
};

for (var i = 0; i < effectsPreview.length; i++) {
  addOnImgUploadPreviewClick(effectsPreview[i], effectsClasses[i], effects[i]);
}

var addFilterOnImg = function (proportionValue) {
  var totalValue = currentFilterType.min + (currentFilterType.max - currentFilterType.min) * proportionValue;
  if (currentFilterType.type === 'none') {
    imgUploadPreview.style.filter = currentFilterType.type;
    imgUploadEffectLevel.classList.add('hidden');
  } else {
    imgUploadPreview.style.filter = currentFilterType.type + '(' + totalValue + currentFilterType.units + ')';
    imgUploadEffectLevel.classList.remove('hidden');
  }
};

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var lineWidth = effectLevelLine.offsetWidth;
  var pinX = effectLevelPin.offsetLeft;
  var mouseStartX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var mouseDiffX = moveEvt.clientX - mouseStartX;
    var newPinX = Math.max(
        0,
        Math.min(
            pinX + mouseDiffX,
            lineWidth
        )
    );

    effectLevelPin.style.left = newPinX + 'px';
    effectLevelDepth.style.width = newPinX + 'px';
    var pinValue = newPinX / lineWidth;
    addFilterOnImg(pinValue);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    var mouseDiffX = upEvt.clientX - mouseStartX;
    var newPinX = Math.max(
        0,
        Math.min(
            pinX + mouseDiffX,
            lineWidth
        )
    );

    effectLevelPin.style.left = newPinX + 'px';
    effectLevelDepth.style.width = newPinX + 'px';
    var pinValue = newPinX / lineWidth;
    addFilterOnImg(pinValue);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };


  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var imgUploadText = document.querySelector('.img-upload__text');
var textHashtags = imgUploadText.querySelector('.text__hashtags');
var imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');

var getCustomValidityHashtag = function () {
  var hashtags = textHashtags.value.split(' ');

  var symbolHashtag = '#';
  var firstSignHashtagMistake = 0;
  var lengthHashtagMistake = 0;
  var duplicateSymbolHashtag = 0;
  var duplicateHashtag = 0;
  var numberOfHashtags = hashtags.length;
  var lengthHashtag = 0;
  var preventSubmit = 0;

  for (var r = 0; r < hashtags.length; r++) {
    var hashtagClaimant = hashtags[r].split('');
    if (symbolHashtag !== hashtagClaimant[0]) {
      firstSignHashtagMistake++;
      preventSubmit++;
    } if (symbolHashtag === hashtagClaimant[0] && hashtagClaimant.length < 2) {
      lengthHashtagMistake++;
      preventSubmit++;
    } if (symbolHashtag === hashtagClaimant[0] && hashtagClaimant.sort()[0] === hashtagClaimant.sort()[1]) {
      duplicateSymbolHashtag++;
      preventSubmit++;
    } if (hashtagClaimant.length > 20) {
      lengthHashtag++;
      preventSubmit++;
    }
  }

  for (var s = 0; s < hashtags.length - 1; s++) {
    for (var t = 1; t < hashtags.length; t++) {
      if (hashtags[s].toLowerCase() === hashtags[t].toLowerCase() && s !== t) {
        duplicateHashtag++;
        preventSubmit++;
      }
    }
  }

  if (firstSignHashtagMistake) {
    textHashtags.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
  } if (lengthHashtagMistake) {
    textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
  } if (duplicateSymbolHashtag) {
    textHashtags.setCustomValidity('Хэш-теги разделяются пробелами');
  } if (duplicateHashtag) {
    textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
  } if (numberOfHashtags > 5) {
    textHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  } if (lengthHashtag) {
    textHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
  } if (!preventSubmit) {
    textHashtags.setCustomValidity('');
  }
};

imgUploadSubmit.addEventListener('click', function () {
  getCustomValidityHashtag();
});

var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

var onBigFotoPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    bigPicture.classList.add('hidden');
  }
};

var openBigFotoPopup = function () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigFotoPopupEscPress);
};

var closeBifFotoPopup = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigFotoPopupEscPress);
};

var usersPictures = picturesContainer.querySelectorAll('.picture');
var addOnUsersPhotoClick = function (userPicture, userPhoto) {
  return userPicture.addEventListener('click', function () {
    openBigFotoPopup();
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

'use strict';

(function () {
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');

  var imgUploadScale = document.querySelector('.scale');
  var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
  var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');

  var effectsList = document.querySelector('.effects__list');
  var effectsPreview = effectsList.querySelectorAll('.effects__preview');
  var imgUploadPreviewWrapper = document.querySelector('.img-upload__preview');
  var imgUploadPreview = imgUploadPreviewWrapper.querySelector('img');

  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
  var effectLevelLine = imgUploadEffectLevel.querySelector('.effect-level__line');
  var effectLevelPin = imgUploadEffectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUploadEffectLevel.querySelector('.effect-level__depth');
  var currentFilterType = {};

  var onError = function () {
    closePopup();
    window.errorModal.errorModalForm();
  };

  var onLoad = function () {
    closePopup();
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(imgUploadForm), onLoad, onError);
    evt.preventDefault();
    imgUploadForm.reset();
  });

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE && evt.target !== textHashtags && evt.target !== textDescription) {
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
    window.preShow.addPreShowImg(imgUploadInput, imgUploadPreview);
    imgUploadPreview.style.transform = 'scale(1)';
    imgUploadPreview.classList.add('effects__preview--none');
    imgUploadPreview.style.filter = 'none';
    imgUploadEffectLevel.classList.add('hidden');
    openPopup();

    imgUploadCancel.addEventListener('click', function () {
      closePopup();
    });
  };

  var getControlValue = function (value, direction) {
    var controlValue = Math.max(
        parseInt(value.min, 10),
        Math.min(
            parseInt(value.value, 10) + (direction ? 1 : -1) * parseInt(value.step, 10),
            parseInt(value.max, 10)
        )
    );

    return controlValue;
  };

  scaleControlBigger.addEventListener('click', function () {
    scaleControlValue.value = (getControlValue(scaleControlValue, true) + '%'
    );
    imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
  });

  scaleControlSmaller.addEventListener('click', function () {
    scaleControlValue.value = (getControlValue(scaleControlValue, false) + '%'
    );
    imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
  });

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
      effectLevelValue.value = Math.floor(pinValue * 100);
      addFilterOnImg(pinValue);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var imgUploadText = document.querySelector('.img-upload__text');
  var textHashtags = imgUploadText.querySelector('.text__hashtags');
  var textDescription = imgUploadText.querySelector('.text__description');
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
      var hashtagsClaimants = hashtags[r].split('');
      if (symbolHashtag !== hashtagsClaimants[0] && hashtagsClaimants.length > 0) {
        firstSignHashtagMistake++;
        preventSubmit++;
      } if (symbolHashtag === hashtagsClaimants[0] && hashtagsClaimants.length < window.data.MIN_LANGTH_HASHTAG) {
        lengthHashtagMistake++;
        preventSubmit++;
      } if (symbolHashtag === hashtagsClaimants[0] && hashtagsClaimants.sort()[0] === hashtagsClaimants.sort()[1]) {
        duplicateSymbolHashtag++;
        preventSubmit++;
      } if (hashtagsClaimants.length > window.data.MAX_LENGTH_HASHTAG) {
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
      preventSubmit++;
    } if (lengthHashtag) {
      textHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    } if (!preventSubmit) {
      textHashtags.setCustomValidity('');
    }
  };

  imgUploadSubmit.addEventListener('click', function () {
    getCustomValidityHashtag();
  });
})();

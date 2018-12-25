'use strict';

(function () {
  var imgUploadText = document.querySelector('.img-upload__text');
  window.validation = {
    textHashtags: imgUploadText.querySelector('.text__hashtags'),
    textDescription: imgUploadText.querySelector('.text__description'),
    getCustomValidityHashtag: function () {
      var hashtags = window.validation.textHashtags.value.toLowerCase().split(' ');

      var symbolHashtag = '#';
      var firstSignHashtagMistake = 0;
      var lengthHashtagMistake = 0;
      var duplicateSymbolHashtag = 0;
      var duplicateHashtag = 0;
      var numberOfHashtags = hashtags.length;
      var lengthHashtag = 0;
      var preventSubmit = 0;

      hashtags.forEach(function (hashtag) {
        if (symbolHashtag !== hashtag[0] && hashtag.length) {
          firstSignHashtagMistake++;
          preventSubmit++;
        } if (symbolHashtag === hashtag[0] && hashtag.length < window.data.MIN_LENGTH_HASHTAG) {
          lengthHashtagMistake++;
          preventSubmit++;
        } if (symbolHashtag === hashtag[0] && hashtag.indexOf(symbolHashtag, 1) > 0) {
          duplicateSymbolHashtag++;
          preventSubmit++;
        } if (hashtag.length > window.data.MAX_LENGTH_HASHTAG) {
          lengthHashtag++;
          preventSubmit++;
        }
      });

      hashtags.forEach(function (hashtag, i) {
        if (hashtags.includes(hashtag, i + 1)) {
          duplicateHashtag++;
          preventSubmit++;
        }
      });

      if (firstSignHashtagMistake) {
        window.validation.textHashtags.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
      } if (lengthHashtagMistake) {
        window.validation.textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      } if (duplicateSymbolHashtag) {
        window.validation.textHashtags.setCustomValidity('Хэш-теги разделяются пробелами');
      } if (duplicateHashtag) {
        window.validation.textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      } if (numberOfHashtags > window.data.MAX_NUMBERS_OF_COMMENTS) {
        window.validation.textHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
        preventSubmit++;
      } if (lengthHashtag) {
        window.validation.textHashtags.setCustomValidity('Максимальная длина одного хэш-тега ' + window.data.MAX_LENGTH_HASHTAG + ' символов, включая решётку');
      } if (window.validation.textDescription.value.length > window.data.MAX_LENGTH_DESCRIPTION) {
        window.validation.textDescription.setCustomValidity('Максимальная длина комментария ' + window.data.MAX_LENGTH_DESCRIPTION + ' символов');
        preventSubmit++;
      } if (!preventSubmit) {
        window.validation.textHashtags.setCustomValidity('');
      }
    }
  };
})();

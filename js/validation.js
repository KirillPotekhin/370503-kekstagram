'use strict';

(function () {
  var imgUploadText = document.querySelector('.img-upload__text');
  window.validation = {
    textHashtags: imgUploadText.querySelector('.text__hashtags'),
    textDescription: imgUploadText.querySelector('.text__description'),
    getCustomValidityHashtag: function () {
      var hashtags = window.validation.textHashtags.value.split(' ');

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
        window.validation.textHashtags.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
      } if (lengthHashtagMistake) {
        window.validation.textHashtags.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      } if (duplicateSymbolHashtag) {
        window.validation.textHashtags.setCustomValidity('Хэш-теги разделяются пробелами');
      } if (duplicateHashtag) {
        window.validation.textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      } if (numberOfHashtags > 5) {
        window.validation.textHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
        preventSubmit++;
      } if (lengthHashtag) {
        window.validation.textHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      } if (!preventSubmit) {
        window.validation.textHashtags.setCustomValidity('');
      }
    }
  };
})();

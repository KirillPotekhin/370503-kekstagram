'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var commentsList = document.querySelector('.social__comments');
  var commentsItems = commentsList.querySelectorAll('.social__comment');

  var lastFocus;

  var onBigFotoPopupEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      bigPicture.classList.add('hidden');
      lastFocus.focus();
    }
  };

  var openBigFotoPopup = function () {
    lastFocus = document.activeElement;
    bigPicture.classList.remove('hidden');
    bigPicture.focus();
    document.addEventListener('keydown', onBigFotoPopupEscPress);
  };

  var closeBifFotoPopup = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigFotoPopupEscPress);
    lastFocus.focus();
  };

  window.preview = {
    addOnUsersPhotoClick: function (userPicture, userPhoto) {
      return userPicture.addEventListener('click', function () {
        openBigFotoPopup();
        bigPictureClose.addEventListener('click', function () {
          closeBifFotoPopup();
        });
        var mainPhotoCard = userPhoto;
        commentsItems = commentsList.querySelectorAll('.social__comment');

        document.querySelector('.big-picture__img').children[0].src = mainPhotoCard.url;
        document.querySelector('.likes-count').textContent = mainPhotoCard.likes;
        window.commentsShow.commentsCount.textContent = mainPhotoCard.comments.length;
        document.querySelector('.social__caption').textContent = mainPhotoCard.description;

        var getCollectedComments = function (picture) {
          var collectedComments = document.querySelector('.social__comment').cloneNode(true);
          collectedComments.querySelector('.social__picture').src = picture.avatar;
          collectedComments.querySelector('.social__text').textContent = picture.message;

          return collectedComments;
        };

        var fragment = document.createDocumentFragment();

        var comments = mainPhotoCard.comments;

        comments.forEach(function (comment) {
          fragment.appendChild(getCollectedComments(comment));
        });

        Array.from(commentsItems).forEach(function (commentsItem) {
          commentsList.removeChild(commentsItem);
        });

        commentsList.appendChild(fragment);

        window.commentsShow.getCommentsItems();
      });
    }
  };
})();

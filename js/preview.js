'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsShown = socialCommentCount.querySelector('.comments-shown');
  var commentsCount = socialCommentCount.querySelector('.comments-count');
  var counterComments;
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var commentsList = document.querySelector('.social__comments');
  var commentsItems = commentsList.querySelectorAll('.social__comment');

  var STEP_COMMENTS = 5;
  var addCommentsShown = function (value) {
    for (var l = counterComments; l < value; l++) {
      commentsItems[l].classList.remove('visually-hidden');
    }
  };

  var onCommentsItemsButtonClick = function () {
    if ((commentsItems.length - counterComments) <= STEP_COMMENTS) {
      addCommentsShown(commentsItems.length);
      counterComments += (commentsItems.length - counterComments);
      commentsShown.textContent = counterComments;
      commentsLoader.classList.add('visually-hidden');
    } else if ((commentsItems.length - counterComments) > STEP_COMMENTS) {
      addCommentsShown(counterComments + STEP_COMMENTS);
      counterComments += STEP_COMMENTS;
      commentsShown.textContent = counterComments;
    }
  };

  var getCommentsItems = function () {
    commentsItems = commentsList.querySelectorAll('.social__comment');
    if (commentsItems.length <= STEP_COMMENTS) {
      counterComments = commentsItems.length;
      commentsShown.textContent = counterComments;
      commentsLoader.classList.add('visually-hidden');
    } else if (commentsItems.length > STEP_COMMENTS) {
      counterComments = STEP_COMMENTS;
      commentsShown.textContent = counterComments;
      for (var k = STEP_COMMENTS; k < commentsItems.length; k++) {
        commentsItems[k].classList.add('visually-hidden');
      }
      commentsLoader.classList.remove('visually-hidden');
    }
    commentsLoader.addEventListener('click', onCommentsItemsButtonClick);
  };

  var onBigFotoPopupEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
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

  window.preview = {
    addOnUsersPhotoClick: function (userPicture, userPhoto) {
      return userPicture.addEventListener('click', function () {
        openBigFotoPopup();
        bigPictureClose.addEventListener('click', function () {
          closeBifFotoPopup();
        });
        var mainPhotoCard = userPhoto;

        document.querySelector('.big-picture__img').children[0].src = mainPhotoCard.url;
        document.querySelector('.likes-count').textContent = mainPhotoCard.likes;
        commentsCount.textContent = mainPhotoCard.comments.length;
        document.querySelector('.social__caption').textContent = mainPhotoCard.description;

        var renderComments = function (picture) {
          var renderCommentsElement = document.querySelector('.social__comment').cloneNode(true);
          renderCommentsElement.querySelector('.social__picture').src = picture.avatar;
          renderCommentsElement.querySelector('.social__text').textContent = picture.message;

          return renderCommentsElement;
        };

        var fragment = document.createDocumentFragment();

        for (var i = 0; i < mainPhotoCard.comments.length; i++) {
          fragment.appendChild(renderComments(mainPhotoCard.comments[i]));
        }

        for (var j = 0; j < commentsItems.length; j++) {
          commentsList.removeChild(commentsItems[j]);
        }

        commentsList.appendChild(fragment);

        getCommentsItems();
      });
    }
  };
})();

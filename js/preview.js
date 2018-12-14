'use strict';

(function () {
  // var picturesContainer = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

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

  // var usersPictures = picturesContainer.querySelectorAll('.picture');
  // console.log(window.usersPictures.length);

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
        document.querySelector('.comments-count').textContent = mainPhotoCard.comments.length;
        document.querySelector('.social__caption').textContent = mainPhotoCard.description;

        var commentsList = document.querySelector('.social__comments');
        var commentsItems = commentsList.querySelectorAll('.social__comment');
        var renderComments = function (picture) {
          var renderCommentsElement = document.querySelector('.social__comment').cloneNode(true);
          renderCommentsElement.querySelector('.social__picture').src = picture.avatar;
          renderCommentsElement.querySelector('.social__text').textContent = picture.message;

          return renderCommentsElement;
        };

        var fragment = document.createDocumentFragment();

        for (var l = 0; l < mainPhotoCard.comments.length; l++) {
          fragment.appendChild(renderComments(mainPhotoCard.comments[l]));
        }

        for (var m = 0; m < commentsItems.length; m++) {
          commentsList.removeChild(commentsItems[m]);
        }

        commentsList.appendChild(fragment);
      });
    }
  };
  // var addOnUsersPhotoClick = function (userPicture, userPhoto) {
  //   return userPicture.addEventListener('click', function () {
  //     openBigFotoPopup();
  //     console.log('HFY');
  //     bigPictureClose.addEventListener('click', function () {
  //       closeBifFotoPopup();
  //     });
  //     var mainPhotoCard = userPhoto;
  //
  //     document.querySelector('.big-picture__img').children[0].src = mainPhotoCard.url;
  //     document.querySelector('.likes-count').textContent = mainPhotoCard.likes;
  //     document.querySelector('.comments-count').textContent = mainPhotoCard.comments.length;
  //     document.querySelector('.social__caption').textContent = mainPhotoCard.description;
  //
  //     var commentsList = document.querySelector('.social__comments');
  //     var commentsItems = commentsList.querySelectorAll('.social__comment');
  //     var renderComments = function (picture) {
  //       var renderCommentsElement = document.querySelector('.social__comment').cloneNode(true);
  //       renderCommentsElement.querySelector('.social__picture').src = picture.avatar;
  //       renderCommentsElement.querySelector('.social__text').textContent = picture.message;
  //
  //       return renderCommentsElement;
  //     };
  //
  //     var fragment = document.createDocumentFragment();
  //
  //     for (var l = 0; l < mainPhotoCard.comments.length; l++) {
  //       fragment.appendChild(renderComments(mainPhotoCard.comments[l]));
  //     }
  //
  //     for (var m = 0; m < commentsItems.length; m++) {
  //       commentsList.removeChild(commentsItems[m]);
  //     }
  //
  //     commentsList.appendChild(fragment);
  //   });
  // };
  // if (window.statusPictures) {
  //   for (var p = 0; p < window.usersPictures.length; p++) {
  //     console.log('asdasd');
  //     window.preview.addOnUsersPhotoClick(window.usersPictures[p], window.gallery.usersPhotos[p]);
  //   }
  // }
})();

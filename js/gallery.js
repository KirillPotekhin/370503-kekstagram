'use strict';

(function () {
  window.gallery = {};
  var CARDS_OF_NUMBERS = 25;

  var usersPhotos = [];
  for (var j = 0; j < CARDS_OF_NUMBERS; j++) {
    usersPhotos[j] = window.picture.getPhotoDescription(j + 1);
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

  window.gallery.usersPhotos = usersPhotos;
})();

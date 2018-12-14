'use strict';

(function () {
  window.gallery = {};
  window.gallery.usersPhotos = [];
  var CARDS_OF_NUMBERS = 25;

  var picturesContainer = document.querySelector('.pictures');
  var pictureDescriptionTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPictureDescription = function (picture) {
    var pictureDescriptionElement = pictureDescriptionTemplate.cloneNode(true);
    pictureDescriptionElement.querySelector('.picture__img').src = picture.url;
    pictureDescriptionElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureDescriptionElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureDescriptionElement;
  };

  var onLoad = function (usersPhotos) {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < CARDS_OF_NUMBERS; k++) {
      fragment.appendChild(renderPictureDescription(usersPhotos[k]));
      window.gallery.usersPhotos[k] = usersPhotos[k];
    }
    picturesContainer.appendChild(fragment);
    window.usersPictures = picturesContainer.querySelectorAll('.picture');
    for (var p = 0; p < window.usersPictures.length; p++) {
      window.preview.addOnUsersPhotoClick(window.usersPictures[p], window.gallery.usersPhotos[p]);
    }
  };

  var onError = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff3541;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '16px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(onLoad, onError);
})();

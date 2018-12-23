'use strict';

(function () {
  window.gallery = {
    picturesContainer: document.querySelector('.pictures')
  };

  var pictureDescriptionTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPictureDescription = function (picture) {
    var pictureDescription = pictureDescriptionTemplate.cloneNode(true);
    pictureDescription.querySelector('.picture__img').src = picture.url;
    pictureDescription.querySelector('.picture__likes').textContent = picture.likes;
    pictureDescription.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureDescription;
  };

  var onLoad = function (usersPhotos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.CARDS_OF_NUMBERS; i++) {
      fragment.appendChild(renderPictureDescription(usersPhotos[i]));
      window.preview.addOnUsersPhotoClick(fragment.lastChild, usersPhotos[i]);
    }
    window.gallery.picturesContainer.appendChild(fragment);

    window.drawingFilter.addDrawingFilter();
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

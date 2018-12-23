'use strict';

(function () {
  window.gallery = {};

  var picturesContainer = document.querySelector('.pictures');
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
    picturesContainer.appendChild(fragment);

    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');

    var imgFiltersForm = imgFilters.querySelector('.img-filters__form');
    var filterPopular = imgFiltersForm.querySelector('#filter-popular');
    var filterNew = imgFiltersForm.querySelector('#filter-new');
    var filterDiscussed = imgFiltersForm.querySelector('#filter-discussed');

    var usersPictures = picturesContainer.querySelectorAll('.picture');
    var usersPicturesGeneralList = Array.prototype.slice.call(usersPictures);

    var getUsersPicturesNewList = function () {
      var usersPicturesGeneralListCopy = usersPicturesGeneralList.slice();
      var usersPicturesNewList = [];
      for (var k = 0; k < window.data.CARDS_NEW; k++) {
        usersPicturesNewList.push((usersPicturesGeneralListCopy.splice((window.data.getRandomNumber(0, usersPicturesGeneralListCopy.length - 1)), 1))[0]);
      }
      return usersPicturesNewList;
    };

    var usersPicturesDiscussed = usersPicturesGeneralList.slice();
    usersPicturesDiscussed.sort(function (first, second) {
      if (parseInt(first.querySelector('.picture__comments').textContent, 10) < parseInt(second.querySelector('.picture__comments').textContent, 10)) {
        return 1;
      }
      if (parseInt(first.querySelector('.picture__comments').textContent, 10) > (parseInt(second.querySelector('.picture__comments').textContent, 10))) {
        return -1;
      }
      return 0;
    });

    var getDesiredChildren = function (array) {
      usersPictures = picturesContainer.querySelectorAll('.picture');

      for (var l = 0; l < usersPictures.length; l++) {
        picturesContainer.removeChild(usersPictures[l]);
      }

      for (var m = 0; m < array.length; m++) {
        picturesContainer.appendChild(array[m]);
      }
    };

    var addRequiredClass = function (firstButton, secondButton, thirdButton) {
      if (secondButton.classList.contains('img-filters__button--active')) {
        secondButton.classList.remove('img-filters__button--active');
      }
      if (thirdButton.classList.contains('img-filters__button--active')) {
        thirdButton.classList.remove('img-filters__button--active');
      }
      firstButton.classList.add('img-filters__button--active');
    };

    filterPopular.addEventListener('click', function () {
      if (!filterPopular.classList.contains('img-filters__button--active')) {
        addRequiredClass(filterPopular, filterNew, filterDiscussed);
        window.debounce(getDesiredChildren.bind(null, usersPicturesGeneralList));
      }
    });

    filterNew.addEventListener('click', function () {
      if (!filterNew.classList.contains('img-filters__button--active')) {
        addRequiredClass(filterNew, filterPopular, filterDiscussed);
        window.debounce(getDesiredChildren.bind(null, getUsersPicturesNewList()));
      }
    });

    filterDiscussed.addEventListener('click', function () {
      if (!filterDiscussed.classList.contains('img-filters__button--active')) {
        addRequiredClass(filterDiscussed, filterPopular, filterNew);
        window.debounce(getDesiredChildren.bind(null, usersPicturesDiscussed));
      }
    });

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

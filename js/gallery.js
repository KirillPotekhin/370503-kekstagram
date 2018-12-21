'use strict';

(function () {
  window.gallery = {};
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
    for (var i = 0; i < CARDS_OF_NUMBERS; i++) {
      fragment.appendChild(renderPictureDescription(usersPhotos[i]));
    }
    picturesContainer.appendChild(fragment);
    var usersPictures = picturesContainer.querySelectorAll('.picture');
    for (var j = 0; j < usersPictures.length; j++) {
      window.preview.addOnUsersPhotoClick(usersPictures[j], usersPhotos[j]);
    }

    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');

    var imgFiltersForm = imgFilters.querySelector('.img-filters__form');
    var filterPopular = imgFiltersForm.querySelector('#filter-popular');
    var filterNew = imgFiltersForm.querySelector('#filter-new');
    var filterDiscussed = imgFiltersForm.querySelector('#filter-discussed');

    var usersPicturesGeneralList = Array.prototype.slice.call(usersPictures);

    var usersPicturesGeneralListCopy = usersPicturesGeneralList.slice();
    var CARDS_NEW = 10;
    var usersPicturesNewList = [];
    for (var k = 0; k < CARDS_NEW; k++) {
      usersPicturesNewList.push((usersPicturesGeneralListCopy.splice((window.data.getRandomNumber(0, usersPicturesGeneralListCopy.length - 1)), 1))[0]);
    }

    var usersPicturesDiscussed = usersPicturesGeneralList.slice();
    usersPicturesDiscussed.sort(function (first, second) {
      if (parseInt(first.querySelector('.picture__comments').textContent, 10) < parseInt(second.querySelector('.picture__comments').textContent, 10)) {
        return 1;
      } else if (parseInt(first.querySelector('.picture__comments').textContent, 10) > (parseInt(second.querySelector('.picture__comments').textContent, 10))) {
        return -1;
      } else {
        return 0;
      }
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

    var addRequiredClass = function (firstElement, secondElement, thirdElement) {
      if (secondElement.classList.contains('img-filters__button--active')) {
        secondElement.classList.remove('img-filters__button--active');
      }
      if (thirdElement.classList.contains('img-filters__button--active')) {
        thirdElement.classList.remove('img-filters__button--active');
      }
      firstElement.classList.add('img-filters__button--active');
    };

    var lastTimeout;
    var DEBOUNCE_INTERVAL = 500;

    // window.debounce = function (cb) {
    //   if (lastTimeout) {
    //     window.clearTimeout(lastTimeout);
    //   }
    //   lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    // };

    filterPopular.addEventListener('click', function () {
      if (!filterPopular.classList.contains('img-filters__button--active')) {
        addRequiredClass(filterPopular, filterNew, filterDiscussed);
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          getDesiredChildren(usersPicturesGeneralList);
        }, DEBOUNCE_INTERVAL);
        // window.debounce(getDesiredChildren(usersPicturesGeneralList));
      }
    });

    filterNew.addEventListener('click', function () {
      if (!filterNew.classList.contains('img-filters__button--active')) {
        addRequiredClass(filterNew, filterPopular, filterDiscussed);
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          getDesiredChildren(usersPicturesNewList);
        }, DEBOUNCE_INTERVAL);
      }
    });

    filterDiscussed.addEventListener('click', function () {
      if (!filterDiscussed.classList.contains('img-filters__button--active')) {
        addRequiredClass(filterDiscussed, filterPopular, filterNew);
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          getDesiredChildren(usersPicturesDiscussed);
        }, DEBOUNCE_INTERVAL);
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

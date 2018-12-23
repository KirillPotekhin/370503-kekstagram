'use strict';

(function () {
  window.drawingFilter = {
    addDrawingFilter: function () {
      var imgFilters = document.querySelector('.img-filters');
      imgFilters.classList.remove('img-filters--inactive');

      var imgFiltersForm = imgFilters.querySelector('.img-filters__form');
      var filterPopular = imgFiltersForm.querySelector('#filter-popular');
      var filterNew = imgFiltersForm.querySelector('#filter-new');
      var filterDiscussed = imgFiltersForm.querySelector('#filter-discussed');

      var usersPictures = window.gallery.picturesContainer.querySelectorAll('.picture');
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
        return parseInt(second.querySelector('.picture__comments').textContent, 10) - parseInt(first.querySelector('.picture__comments').textContent, 10);
      });

      var getDesiredChildren = function (array) {
        usersPictures = window.gallery.picturesContainer.querySelectorAll('.picture');

        for (var l = 0; l < usersPictures.length; l++) {
          window.gallery.picturesContainer.removeChild(usersPictures[l]);
        }

        for (var m = 0; m < array.length; m++) {
          window.gallery.picturesContainer.appendChild(array[m]);
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
    }
  };
})();

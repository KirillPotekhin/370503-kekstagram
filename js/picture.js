'use strict';

(function () {
  window.picture = {
    getPhotoDescription: function (photoNumber) {
      var photoDescription = {};

      photoDescription.url = 'photos/' + photoNumber + '.jpg';

      photoDescription.likes = window.data.getRandomNumber(15, 200);

      var numberOfComments = window.data.getRandomNumber(1, window.data.usersComments.length);
      var comments = [];
      for (var i = 0; i < numberOfComments; i++) {
        comments[i] = {};
        comments[i].avatar = 'img/avatar-' + window.data.getRandomNumber(1, 6) + '.svg';
        comments[i].message = window.data.usersComments[window.data.getRandomNumber(0, window.data.usersComments.length - 1)];
        comments[i].name = window.data.names[window.data.getRandomNumber(0, window.data.names.length - 1)];
      }
      photoDescription.comments = comments;

      return photoDescription;
    }
  };
})();

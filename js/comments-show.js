'use strict';

(function () {
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsShown = socialCommentCount.querySelector('.comments-shown');
  var counterComments;
  var bigPicture = document.querySelector('.big-picture');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var commentsList = document.querySelector('.social__comments');
  var commentsItems = commentsList.querySelectorAll('.social__comment');

  var addCommentsShown = function (value) {
    for (var l = counterComments; l < value; l++) {
      commentsItems[l].classList.remove('visually-hidden');
    }
  };

  var onCommentsItemsButtonClick = function () {
    if ((commentsItems.length - counterComments) <= window.data.STEP_COMMENTS) {
      addCommentsShown(commentsItems.length);
      counterComments += (commentsItems.length - counterComments);
      commentsShown.textContent = counterComments;
      commentsLoader.classList.add('visually-hidden');
    } else {
      addCommentsShown(counterComments + window.data.STEP_COMMENTS);
      counterComments += window.data.STEP_COMMENTS;
      commentsShown.textContent = counterComments;
    }
  };

  window.commentsShow = {
    getCommentsItems: function () {
      commentsItems = commentsList.querySelectorAll('.social__comment');
      if (commentsItems.length <= window.data.STEP_COMMENTS) {
        counterComments = commentsItems.length;
        commentsShown.textContent = counterComments;
        commentsLoader.classList.add('visually-hidden');
      } else {
        counterComments = window.data.STEP_COMMENTS;
        commentsShown.textContent = counterComments;
        for (var k = window.data.STEP_COMMENTS; k < commentsItems.length; k++) {
          commentsItems[k].classList.add('visually-hidden');
        }
        commentsLoader.classList.remove('visually-hidden');
      }
      commentsLoader.addEventListener('click', onCommentsItemsButtonClick);
    },
    commentsCount: socialCommentCount.querySelector('.comments-count')
  };
})();

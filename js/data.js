'use strict';

(function () {
  window.data = {
    CARDS_OF_NUMBERS: 25,
    CARDS_NEW: 10,
    STEP_COMMENTS: 5,
    ESC_KEYCODE: 27,
    DEBOUNCE_INTERVAL: 500,
    MAX_LENGTH_HASHTAG: 20,
    MIN_LANGTH_HASHTAG: 2,
    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],
    getRandomNumber: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    }
  };
})();

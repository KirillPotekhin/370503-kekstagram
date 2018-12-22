'use strict';

(function () {
  window.data = {
    CARDS_OF_NUMBERS: 25,
    CARDS_NEW: 10,
    STEP_COMMENTS: 5,
    ESC_KEYCODE: 27,
    getRandomNumber: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    }
  };
})();

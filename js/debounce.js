'use strict';

(function () {
  var lastTimeout;
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();

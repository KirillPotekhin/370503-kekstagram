'use strict';

(function () {
  var loadProcces = function (method, url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open(method, url);

    xhr.send(data);
  };

  window.load = function (onLoad, onError) {
    loadProcces('GET', 'https://js.dump.academy/kekstagram/data', undefined, onLoad, onError);
  };

  window.upload = function (data, onLoad, onError) {
    loadProcces('POST', 'https://js.dump.academy/kekstagram', data, onLoad, onError);
  };
})();

'use strict';

(function () {
  window.preShow = {
    addPreShowImg: function (inputFile, picture) {
      var file = inputFile.files[0];
      var fileName = file.name.toLowerCase();

      var matches = window.data.FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          picture.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };
})();

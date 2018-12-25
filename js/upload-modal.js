'use strict';

(function () {
  window.uploadModal = {
    addUploadModalForm: function (status) {
      var uploadModalTemplate = document.querySelector('#' + status).content.querySelector('.' + status);
      var formUploadModal = uploadModalTemplate.cloneNode(true);
      document.querySelector('main').insertAdjacentElement('afterbegin', formUploadModal);
      formUploadModal = document.querySelector('.' + status);
      formUploadModal.style.zIndex = 3;

      var onFormUploadModalEscPress = function (evt) {
        if (evt.keyCode === window.data.ESC_KEYCODE) {
          closeFormSuccessModal();
        }
      };

      document.addEventListener('keydown', onFormUploadModalEscPress);

      var onCloseFormUploadModal = function () {
        closeFormSuccessModal();
      };

      document.addEventListener('click', onCloseFormUploadModal);

      if (status === 'error') {
        var formErrorButtons = formUploadModal.querySelectorAll('.error__button');
        Array.from(formErrorButtons).forEach(function (formErrorButton) {
          formErrorButton.addEventListener('click', onCloseFormUploadModal);
        });
      }
      if (status === 'success') {
        var formSuccessButton = formUploadModal.querySelector('.success__button');
        formSuccessButton.addEventListener('click', onCloseFormUploadModal);
      }

      var closeFormSuccessModal = function () {
        document.querySelector('main').removeChild(formUploadModal);
        document.removeEventListener('keydown', onFormUploadModalEscPress);
        document.removeEventListener('click', onCloseFormUploadModal);
      };
    }
  };
})();

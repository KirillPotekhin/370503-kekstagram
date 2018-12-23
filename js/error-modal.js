'use strict';

(function () {
  window.errorModal = {
    addErrorModalForm: function () {
      var formErrorTemplate = document.querySelector('#error').content.querySelector('.error');
      var formErrorModal = formErrorTemplate.cloneNode(true);
      document.querySelector('main').insertAdjacentElement('afterbegin', formErrorModal);
      formErrorModal = document.querySelector('.error');
      var formErrorButtons = formErrorModal.querySelectorAll('.error__button');
      formErrorModal.style.zIndex = 3;

      var onFormErrorModalEscPress = function (evt) {
        if (evt.keyCode === window.data.ESC_KEYCODE) {
          closeFormErrorModal();
        }
      };

      document.addEventListener('keydown', onFormErrorModalEscPress);

      var onCloseFormErrorModal = function () {
        closeFormErrorModal();
      };

      document.addEventListener('click', onCloseFormErrorModal);

      formErrorButtons.forEach(function (formErrorButton) {
        formErrorButton.addEventListener('click', onCloseFormErrorModal);
      });

      var closeFormErrorModal = function () {
        document.querySelector('main').removeChild(formErrorModal);
        document.removeEventListener('keydown', onFormErrorModalEscPress);
        document.removeEventListener('click', onCloseFormErrorModal);
      };
    }
  };
})();

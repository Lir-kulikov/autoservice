import Bouncer from '../../node_modules/formbouncerjs/dist/bouncer.polyfills.min'
import Inputmask from "inputmask";
import '../js/vendor/hystmodal.min'

//fix focus bug .service-card__btn
document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('.form');

  const serviceBtns = document.querySelectorAll('.service-card__btn');

  for (let btn of serviceBtns) {
    const parent = btn.closest('.service-card');
    btn.addEventListener('focus', () => {
      parent.classList.add('is-active');
    });

    btn.addEventListener('blur', () => {
      parent.classList.remove('is-active');
    });
  };


  // inputmask

  let selector = document.querySelectorAll('input[type="tel"]');
  let im = new Inputmask('+7 (999) 999-99-99');
  im.mask(selector);

  //form validation

  let modalForm;
  const modalFormInit = () => {
    modalForm = new Bouncer('.form', {
      disableSubmit: true,
      messageAfterField: true,
      messages: {
        missingValue: {
          default: 'Заполните поле'
        },
        patternMismatch: {
          email: 'Введите правильный e-mail',
          default: 'Введите правильный номер'
        }
      },
      patterns: {
        tel: '[^_]$',
      }
    });
  }
  modalFormInit();

  // validate on Blur

  const fixEmptyError = (form) => {
    let trySubmit = 0;
    for (let item of form.elements) {
      if (item.tagName == 'INPUT') {
        item.addEventListener('blur', () => {
          if (item.value == "" && trySubmit === 0) {
            item.classList.remove('error');
            if (item.nextElementSibling.classList.contains('error-message')) {
              item.nextElementSibling.parentNode.removeChild(item.nextElementSibling);
            };
          };
        });
      };
    };
    form.addEventListener('bouncerFormInvalid', () => {
      trySubmit = 1;
    });
  };
  fixEmptyError(form);


  form.addEventListener('bouncerFormValid', formSend);
  document.querySelector('.modal__window').classList.add('is-loading');
  let formData = new FormData(form);

  async function formSend(e) {
    form.reset();

    let formData = new FormData(form);
    console.log(formData);
    let response = await fetch('mail.php', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      let result = await response.json();
      myModal.open('#modal-succes');
      setTimeout(() => myModal.close(), 3000)
      form.reset();
      document.querySelector('.modal__window').classList.remove('is-loading');
    } else {
      alert('Упс, что-то пошло не так');
      document.querySelector('.modal__window').classList.remove('is-loading');
    }
  };



  // modal init

  const myModal = new HystModal({
    linkAttributeName: 'data-modal',
    afterClose: function(modal) {
      form.reset();
      modalForm.destroy();
      modalFormInit();
    }
  });
});
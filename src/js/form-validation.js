import Bouncer from '../../node_modules/formbouncerjs/dist/bouncer.polyfills.min'
import Inputmask from "inputmask";

// inputmask

let selector = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(selector);

//form

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
        password: 'Введите не менее 6 символов'
      },
      wrongLength: {
        under: 'Введите не менее {minLength} символов.'
      }
    },
  });
}

modalFormInit();
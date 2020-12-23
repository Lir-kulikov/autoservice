import '../js/vendor/hystmodal.min'

const myModal = new HystModal({
  linkAttributeName: "data-modal",
  //настройки, см. API
});

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
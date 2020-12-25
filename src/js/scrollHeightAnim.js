document.addEventListener('DOMContentLoaded', () => {
  const showBtns = document.querySelectorAll('.service-card__btn');
  const showPrice = document.querySelectorAll('.service-card__price');
  const moreBtn = document.querySelector('.price__more-btn');
  const tableWrapper = document.querySelector('.price__inner');

  moreBtn.addEventListener('click', () => {
    const h = tableWrapper.scrollHeight;
    const offHeight = window.pageYOffset;
    if (tableWrapper.classList.contains('is-open')) {
      tableWrapper.classList.remove('is-open');
      tableWrapper.style.maxHeight = 400 + 'px';
      window.scrollBy({
        top: offHeight,
        behavior: 'smooth'
      });
    } else {
      tableWrapper.classList.add('is-open');
      tableWrapper.style.maxHeight = h + 'px';
    }
  });
});
const setHeight = (showBtn, elBlock) => {
  elBlock.style.height = 0 + 'px';
  if (elBlock.style.height !== "0px") {
    showBtn.classList.add('is-open');
    elBlock.classList.add('is-open');
  }
  showBtn.addEventListener("click", () => {
    if (elBlock.style.height === "0px" || !elBlock.style.height === "0px") {
      elBlock.style.height = `${ elBlock.scrollHeight }px`
      showBtn.classList.add('is-open');
      elBlock.classList.add('is-open');
    } else {
      elBlock.style.height = `${ elBlock.scrollHeight }px`;
      window.getComputedStyle(elBlock, null).getPropertyValue("height");
      elBlock.style.height = "0px";
      showBtn.classList.remove('is-open');
      elBlock.classList.remove('is-open');
    }
  });

  elBlock.addEventListener("transitionend", () => {
    if (elBlock.style.height !== "0px") {
      elBlock.style.height = "auto"
    }
  });
}

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
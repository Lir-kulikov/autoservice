import Swiper from 'swiper/swiper-bundle';

document.addEventListener('DOMContentLoaded', () => {
  const mySwiper = new Swiper('.swiper-container-hero', {
    slidesPerView: 1,
    loop: true,
    speed: 700,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  });
});
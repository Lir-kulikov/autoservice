import SmoothScroll from 'smooth-scroll';
document.addEventListener('DOMContentLoaded', () => {
  var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 600,
    speedAsDuration: true
  });
  
  const nav = document.querySelector('nav');
  const links = nav.querySelectorAll('a[href*="#"]');
  const mobileMenu = document.querySelector('.header__group');
  const body = document.querySelector('body');
  
  
  for (let link of links) {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      body.classList.remove('is-fixed');
    });
  };
});
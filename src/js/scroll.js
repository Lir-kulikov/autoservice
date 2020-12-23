import SmoothScroll from 'smooth-scroll';

var scroll = new SmoothScroll('a[href*="#"]', {
	speed: 600,
	speedAsDuration: true
});

const nav = document.querySelector('nav');
const links = nav.querySelectorAll('a[href*="#"]');
const mobileMenu = document.querySelector('.mobile-menu');


for (let link of links) {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
  });
};
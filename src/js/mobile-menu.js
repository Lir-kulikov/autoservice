document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu__close')

  const openCloseMenu = (openBtn, menu, closeBtn) => {
    openBtn.addEventListener('click', () => {
      menu.classList.toggle('is-open');
      openBtn.classList.toggle('is-open');
    });
    if (closeBtn) {
      closeBtn.addEventListener('click', () => menu.classList.remove('is-open'));
    }

    window.addEventListener('click', (e) => {
      if (menu.classList.contains('is-open') && !menu.contains(e.target) && !openBtn.contains(e.target)) {
        menu.classList.remove('is-open');
        openBtn.classList.remove('is-open');
      }
    });
  };
  openCloseMenu(burger, mobileMenu, mobileMenuClose);
});
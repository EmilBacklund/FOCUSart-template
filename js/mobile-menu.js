const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

const ShowMobileMenu = () => {
  hamburgerMenu.classList.toggle('is-active');
  hamburgerMenu.classList.toggle('active--hamburger-icon');
  mobileMenu.classList.toggle('active-mobile-menu');
};

hamburgerMenu.addEventListener('click', ShowMobileMenu);

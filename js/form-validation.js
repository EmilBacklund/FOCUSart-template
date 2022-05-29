const form = document.querySelector('#contactForm');
const artistName = document.querySelector('#name');
const nameError = document.querySelector('#nameError');
const email = document.querySelector('#email');
const emailError = document.querySelector('#emailError');
const phone = document.querySelector('#phone');
const phoneError = document.querySelector('#phoneError');
const message = document.querySelector('#message');
const messageError = document.querySelector('#messageError');
const contactSuccess = document.querySelector('.contact-success');
const submit = document.querySelector('.submit-button');

function validateForm() {
  event.preventDefault();

  if (checkLength(artistName.value, 0) === true) {
    nameError.style.display = 'none';
  } else {
    nameError.style.display = 'block';
  }
  if (checkLength(message.value, 25) === true) {
    messageError.style.display = 'none';
  } else {
    messageError.style.display = 'block';
  }
  if (validateEmail(email.value) || email.value === '') {
    emailError.style.display = 'none';
  } else {
    emailError.style.display = 'block';
  }
  if (
    messageError.style.display === 'none' &&
    emailError.style.display === 'none' &&
    nameError.style.display === 'none'
  ) {
    contactSuccess.style.display = 'block';
  }
}

form.addEventListener('submit', validateForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

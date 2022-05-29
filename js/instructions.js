const instructionIcon = document.querySelector('.instruction-icon');
const instructionContent = document.querySelector('.mobile-instructions');
const closeIcon = document.querySelector('.close');
const closeButton = document.querySelector('.close-button');

const showInstructions = () => {
  instructionContent.classList.toggle('active-mobile-instructions');
};

instructionIcon.addEventListener('click', showInstructions);

const closeInstructions = () => {
  instructionContent.classList.remove('active-mobile-instructions');
};

closeIcon.addEventListener('click', closeInstructions);
closeButton.addEventListener('click', closeInstructions);

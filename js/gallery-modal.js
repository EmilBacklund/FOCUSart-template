const images = document.querySelectorAll('.image img');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-image');
const modalText = document.querySelector('.modal-text');
const closeModal = document.querySelector('.close');
const nextBtn = document.querySelector('.next-button');
const prevBtn = document.querySelector('.prev-button');

images.forEach((image, index) => {
  image.addEventListener('click', () => {
    modalImg.src = image.src;
    modalText.innerHTML = image.alt;
    modal.classList.add('appear');

    let imageIndex = index;
    let next = imageIndex++;
    let prev = imageIndex--;

    window.addEventListener('keyup', (e) => {
      if (next >= images.length) {
        next = 0;
      }
      if (prev < 0) {
        prev = images.length - 1;
      }

      if (e.keyCode === 37) {
        modalImg.src = images[prev].src;
        modalText.innerHTML = images[prev].alt;
        prev--;
        next = prev + 2;
      } else if (e.keyCode === 39) {
        modalImg.src = images[next].src;
        modalText.innerHTML = images[next].alt;
        next++;
        prev = next - 2;
      } else if (e.keyCode === 27) {
        modal.classList.remove('appear');
      }
    });

    prevBtn.addEventListener('click', () => {
      if (next >= images.length) {
        next = 0;
      }
      if (prev < 0) {
        prev = images.length - 1;
      }
      modalImg.src = images[prev].src;
      modalText.innerHTML = images[prev].alt;
      prev--;
      next = prev + 2;
    });

    nextBtn.addEventListener('click', () => {
      if (next >= images.length) {
        next = 0;
      }
      if (prev < 0) {
        prev = images.length - 1;
      }
      modalImg.src = images[next].src;
      modalText.innerHTML = images[next].alt;
      next++;
      prev = next - 2;
    });

    closeModal.addEventListener('click', () => {
      modal.classList.remove('appear');
    });
  });
});

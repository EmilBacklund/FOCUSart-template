const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelectorAll('.next-icon');
const prevBtn = document.querySelectorAll('.previous-icon');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
  for (i = 0; i < nextBtn.length; i++) {
    if (targetIndex === 0) {
      prevBtn[i].classList.add('is-hidden');
      nextBtn[i].classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
      prevBtn[i].classList.remove('is-hidden');
      nextBtn[i].classList.add('is-hidden');
    } else {
      prevBtn[i].classList.remove('is-hidden');
      nextBtn[i].classList.remove('is-hidden');
    }
  }
};

for (i = 0; i < prevBtn.length; i++) {
  prevBtn[i].addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const prevIndex = slides.findIndex((slide) => slide === prevSlide);

    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
  });
}

for (i = 0; i < nextBtn.length; i++) {
  nextBtn[i].addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);

    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
  });
}

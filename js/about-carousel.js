const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel-right-arrow');
const prevBtn = document.querySelector('.carousel-left-arrow');
const nav = document.querySelector('.carousel-nav-numbers');
const navNumber = Array.from(nav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

const updateNumbers = (currentNumber, targetNumber) => {
  currentNumber.classList.remove('carousel-nav-active');
  targetNumber.classList.add('carousel-nav-active');
};

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
  if (targetIndex === 0) {
    prevBtn.classList.add('carousel-arrow-hidden');
    nextBtn.classList.remove('carousel-arrow-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevBtn.classList.remove('carousel-arrow-hidden');
    nextBtn.classList.add('carousel-arrow-hidden');
  } else {
    prevBtn.classList.remove('carousel-arrow-hidden');
    nextBtn.classList.remove('carousel-arrow-hidden');
  }
};

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

prevBtn.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentNumber = nav.querySelector('.carousel-nav-active');
  const prevNumber = currentNumber.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateNumbers(currentNumber, prevNumber);
  hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
});

nextBtn.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentNumber = nav.querySelector('.carousel-nav-active');
  const nextNumber = currentNumber.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateNumbers(currentNumber, nextNumber);
  hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
});

nav.addEventListener('click', (e) => {
  const targetNumber = e.target.closest('div');

  if (!targetNumber) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentNumber = nav.querySelector('.carousel-nav-active');
  const targetIndex = navNumber.findIndex((number) => number === targetNumber);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateNumbers(currentNumber, targetNumber);
  hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
});

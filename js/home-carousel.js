const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-slide img");
const carouselSection = document.querySelectorAll(".carousel-section");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const prevBtnMobile = document.querySelector("#prevBtnMobile");
const nextBtnMobile = document.querySelector("#nextBtnMobile");

let counter = 1;

const size = carouselSection[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = size * index + "px";
};
carouselSection.forEach(setSlidePosition);

// carouselSlide.style.transform = `translateX(${-size * counter}px)`;

nextBtn.addEventListener("click", () => {
  if (counter >= carouselSection.length - 1) return;
  carouselSlide.style.transition = `transform 0.4s ease-in-out`;
  counter++;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = `transform 0.4s ease-in-out`;
  counter--;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
});

carouselSlide.addEventListener("transitionend", () => {
  if (carouselSection[counter].id === "lastClone") {
    carouselSlide.style.transition = `none`;
    counter = carouselSection.length - 2;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }
  if (carouselSection[counter].id === "firstClone") {
    carouselSlide.style.transition = `none`;
    counter = carouselSection.length - counter;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }
});

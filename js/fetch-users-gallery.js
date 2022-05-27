const galleryImages = document.querySelectorAll(".image");
const username = document.querySelectorAll(".username");
const modalText = document.querySelector(".modal-text");
const loading = document.querySelector(".lds-ellipsis");
const innerContainer = document.querySelector(".inner-behaviour");

async function fetchUsers() {
  try {
    const response = await fetch(
      `https://emilbacklund.flywheelsites.com/wp-json/wp/v2/posts?acf_format=standard&per_page=20`
    );
    const userData = await response.json();

    console.log(userData);

    const data = { post: userData };

    console.log(data);

    loading.classList.remove("show");

    addDataToDOM(data);

    // Modal starts:
    //! This is loading after the above is finnished
    const images = document.querySelectorAll(".image img");
    const modal = document.querySelector(".modal");
    const modalImg = document.querySelector(".modal-image");
    const closeModal = document.querySelector(".close");
    const nextBtn = document.querySelector(".next-button");
    const prevBtn = document.querySelector(".prev-button");
    const modalContainer = document.querySelector(".modal-container");

    images.forEach((image, index) => {
      image.addEventListener("click", () => {
        modalImg.src = image.src;
        modalText.innerHTML = image.alt;
        modal.classList.add("appear");
        modalContainer.classList.add("appear");

        let imageIndex = index;
        let next = imageIndex++;
        let prev = imageIndex--;

        window.addEventListener("keyup", (e) => {
          if (next >= images.length) {
            next = 0;
          }
          if (prev < 0) {
            prev = images.length - 1;
          }

          if (e.keyCode === 37) {
            modalImg.src = images[prev].src;
            modalText.innerHTML = userData[prev].acf.main_image_name;
            prev--;
            next = prev + 2;
          } else if (e.keyCode === 39) {
            modalImg.src = images[next].src;
            modalText.innerHTML = userData[next].acf.main_image_name;
            next++;
            prev = next - 2;
          } else if (e.keyCode === 27) {
            modal.classList.remove("appear");
            modalContainer.classList.remove("appear");
          }
        });

        prevBtn.addEventListener("click", () => {
          if (next >= images.length) {
            next = 0;
          }
          if (prev < 0) {
            prev = images.length - 1;
          }
          modalImg.src = images[prev].src;
          modalText.innerHTML = userData[prev].acf.main_image_name;
          prev--;
          next = prev + 2;
        });

        nextBtn.addEventListener("click", () => {
          if (next >= images.length) {
            next = 0;
          }
          if (prev < 0) {
            prev = images.length - 1;
          }
          modalImg.src = images[next].src;
          modalText.innerHTML = userData[next].acf.main_image_name;
          next++;
          prev = next - 2;
        });

        closeModal.addEventListener("click", () => {
          modal.classList.remove("appear");
          modalContainer.classList.remove("appear");
        });

        modal.addEventListener("click", (e) => {
          console.log(e.target);
          if (e.target === this) {
            return;
          }
          modal.classList.remove("appear");
          modalContainer.classList.remove("appear");
        });
      });
    });
    // Modal ends

    for (i = 0; i < images.length; i++) {
      images[i].setAttribute("draggable", false);
      modalImg.setAttribute("draggable", false);
    }
  } catch (error) {}
}

function addDataToDOM(data) {
  const gridContainer = document.querySelector(".grid-container");
  console.log(data);
  let postNumber;
  gridContainer.innerHTML += `
  <div class="gallery-container w-3 h-2 mobile-h-2">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${data.post[(postNumber = getRandomNr())].acf.main_image.url}
              alt=${data.post[postNumber].acf.main_image_name}
              >
              </div>
              <div class="username">
              ${data.post[postNumber].acf.artist_name}
              </div>
            </div>
          </div>
          <div class="gallery-container w-3 h-3 mobile-h-1">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${
                data.post[(postNumber = getRandomNr())].acf.secondary1_image.url
              }
              alt=${data.post[postNumber].acf.secondary1_image_name}
              >
              </div>
              <div class="username">
              ${data.post[postNumber].acf.artist_name}
              </div>
            </div>
          </div>
          <div class="gallery-container w-2 h-2 mobile-h-1">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${
                data.post[(postNumber = getRandomNr())].acf.secondary2_image.url
              }
              alt=${data.post[postNumber].acf.secondary2_image_name}
              >
              </div>
              <div class="username">
              ${data.post[postNumber].acf.artist_name}
              </div>
            </div>
          </div>
          <div class="gallery-container w-1 h-1 mobile-h-1">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${data.post[(postNumber = getRandomNr())].acf.main_image.url}
              alt=${data.post[postNumber].acf.main_image_name}
              >
              </div>
              <div class="username">
              ${data.post[postNumber].acf.artist_name}
              </div>
            </div>
          </div>
          <div class="gallery-container w-2 h-1 mobile-h-2">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${
                data.post[(postNumber = getRandomNr())].acf.secondary1_image.url
              }
              alt=${data.post[postNumber].acf.secondary1_image_name}
              >
              </div>
              <div class="username">
              ${data.post[postNumber].acf.artist_name}
              </div>
            </div>
          </div>
          <div class="gallery-container w-2 h-1 mobile-h-1">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${
                data.post[(postNumber = getRandomNr())].acf.secondary2_image.url
              }
              alt=${data.post[postNumber].acf.secondary2_image_name}
              >
              </div>
              <div class="username">
              ${data.post[postNumber].acf.artist_name}
              </div>
            </div>
          </div>
          <div class="gallery-container w-3 h-3 mobile-h-2">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${data.post[(postNumber = getRandomNr())].acf.main_image.url}
              alt=${data.post[postNumber].acf.main_image_name}
              >
              </div>
              <div class="username">
              ${data.post[postNumber].acf.artist_name}
              </div>
            </div>
          </div>
          <div class="gallery-container w-3 h-2 mobile-h-1">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${
                data.post[(postNumber = getRandomNr())].acf.secondary1_image.url
              }
              alt=${data.post[postNumber].acf.secondary1_image_name}
              >
              </div>
              <div class="username">
              ${data.post[postNumber].acf.artist_name}
              </div>
            </div>
          </div>
          <div class="gallery-container w-1 h-1 mobile-h-1">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${
                data.post[(postNumber = getRandomNr())].acf.secondary2_image.url
              }
              alt=${data.post[postNumber].acf.secondary2_image_name}
              >
              </div>
              <div class="username">
              ${data.post[postNumber].acf.artist_name}
              </div>
            </div>
          </div>
          <div class="gallery-container w-2 h-2 mobile-h-1">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${data.post[(postNumber = getRandomNr())].acf.main_image.url}
              alt=${data.post[postNumber].acf.main_image_name}
              >
              </div>
              <div class="username">
              ${data.post[postNumber].acf.artist_name}
              </div>
            </div>
          </div>
          <div class="gallery-container w-2 h-1 mobile-h-2">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${
                data.post[(postNumber = getRandomNr())].acf.secondary1_image.url
              } 
              alt=${data.post[postNumber].acf.secondary1_image_name}
              >
              </div>
              <div class="username">
              ${data.post[postNumber].acf.artist_name}
              </div>
            </div>
          </div>
          <div class="gallery-container w-4 h-4 mobile-h-1">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${
                data.post[(postNumber = getRandomNr())].acf.secondary2_image.url
              }
              alt=${data.post[postNumber].acf.secondary2_image_name}
              >
              </div>
              <div class="username">
              ${data.post[postNumber].acf.artist_name}
              </div>
            </div>
          </div>
  `;
  innerContainer.appendChild(gridContainer);
}

window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;

  if (Math.ceil(scrolled) === scrollable) {
    showLoading();
  }
});

function showLoading() {
  loading.classList.add("show");
  setTimeout(fetchUsers, 500);
}

function getRandomNr() {
  let random = Math.floor(Math.random() * 20);
  console.log(random);
  return random;
}

fetchUsers();

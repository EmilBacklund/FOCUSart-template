const galleryImages = document.querySelectorAll('.image');
const username = document.querySelectorAll('.username');
const loading = document.querySelector('.lds-ellipsis');
const innerContainer = document.querySelector('.inner-behaviour');

async function fetchUsers() {
  try {
    const response = await fetch(
      `https://emilbacklund.flywheelsites.com/wp-json/wp/v2/posts?acf_format=standard&per_page=22`
    );
    const userData = await response.json();

    const data = { post: userData };

    loading.classList.remove('show');

    addDataToDOM(data);

    // Modal starts:
    //! This is loading after the above is finnished
    function loadModal() {
      const images = document.querySelectorAll('.image img');
      const modal = document.querySelector('.modal');
      const modalImg = document.querySelector('.modal-image');
      const closeModal = document.querySelector('.close');
      const nextBtn = document.querySelector('.next-button');
      const prevBtn = document.querySelector('.prev-button');
      const modalContainer = document.querySelector('.modal-container');
      const modalText = document.querySelector('.modal-text');

      console.log(images);

      images.forEach((image, index) => {
        image.addEventListener('click', () => {
          console.dir(modalImg);

          function getIDonClick() {
            for (i = 0; i < data.post.length; i++) {
              if (
                image.offsetParent.innerText == data.post[i].acf.artist_name
              ) {
                id = `/detailpage.html?id=${data.post[i].id}`;
                return id;
              }
            }
          }

          let hrefURL = getIDonClick();

          modalImg.src = image.src;
          modalText.innerHTML = `${image.alt} by <a title="See more of ${image.offsetParent.innerText}" href="${hrefURL}">${image.offsetParent.innerText}</a>`;
          modal.classList.add('appear');
          modalContainer.classList.add('appear');

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

            function getIDnext() {
              for (i = 0; i < data.post.length; i++) {
                if (
                  images[next].offsetParent.innerText ==
                  data.post[i].acf.artist_name
                ) {
                  id = `/detailpage.html?id=${data.post[i].id}`;
                  return id;
                }
              }
            }

            let hrefNext = getIDnext();

            function getIDprev() {
              for (i = 0; i < data.post.length; i++) {
                if (
                  images[prev].offsetParent.innerText ==
                  data.post[i].acf.artist_name
                ) {
                  id = `/detailpage.html?id=${data.post[i].id}`;
                  return id;
                }
              }
            }

            let hrefPrev = getIDprev();

            if (e.keyCode === 37) {
              modalImg.src = images[prev].src;
              modalText.innerHTML = `${images[prev].alt} by <a title="See more of ${images[prev].offsetParent.innerText}" href="${hrefPrev}">${images[prev].offsetParent.innerText}</a>`;
              prev--;
              next = prev + 2;
              console.log(imageIndex);
              console.log(images.length);
            } else if (e.keyCode === 39) {
              modalImg.src = images[next].src;
              modalText.innerHTML = `${images[next].alt} by <a title="See more of ${images[next].offsetParent.innerText}" href="${hrefNext}">${images[next].offsetParent.innerText}</a>`;
              console.log(hrefURL);
              console.dir(images[next]);
              next++;
              prev = next - 2;
            } else if (e.keyCode === 27) {
              modal.classList.remove('appear');
              modalContainer.classList.remove('appear');
            }
          });

          prevBtn.addEventListener('click', () => {
            if (next >= images.length) {
              next = 0;
            }
            if (prev < 0) {
              prev = images.length - 1;
            }

            function getIDprevClick() {
              for (i = 0; i < data.post.length; i++) {
                if (
                  images[prev].offsetParent.innerText ==
                  data.post[i].acf.artist_name
                ) {
                  id = `/detailpage.html?id=${data.post[i].id}`;
                  return id;
                }
              }
            }

            let hrefPrevClick = getIDprevClick();

            modalImg.src = images[prev].src;
            modalText.innerHTML = `${images[prev].alt} by <a title="See more of ${images[prev].offsetParent.innerText}" href="${hrefPrevClick}">${images[prev].offsetParent.innerText}</a>`;
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

            function getIDnextClick() {
              for (i = 0; i < data.post.length; i++) {
                if (
                  images[next].offsetParent.innerText ==
                  data.post[i].acf.artist_name
                ) {
                  id = `/detailpage.html?id=${data.post[i].id}`;
                  return id;
                }
              }
            }

            let hrefNextClick = getIDnextClick();

            modalImg.src = images[next].src;
            modalText.innerHTML = `${images[next].alt} by <a title="See more of ${images[next].offsetParent.innerText}" href="${hrefNextClick}">${images[next].offsetParent.innerText}</a>`;
            next++;
            prev = next - 2;
          });

          closeModal.addEventListener('click', () => {
            modal.classList.remove('appear');
            modalContainer.classList.remove('appear');
          });

          modal.addEventListener('click', (e) => {
            if (e.target === this) {
              return;
            }
            modal.classList.remove('appear');
            modalContainer.classList.remove('appear');
          });
        });
      });
    }
    loadModal();

    // Modal ends

    for (i = 0; i < images.length; i++) {
      images[i].setAttribute('draggable', false);
      modalImg.setAttribute('draggable', false);
    }
  } catch (error) {}
}

function addDataToDOM(data) {
  const gridContainer = document.querySelector('.grid-container');
  let postNumber;

  gridContainer.innerHTML += `
  <div class="gallery-container w-3 h-2 mobile-h-2">
            <div class="gallery-item">
              <div class="image">
              <img
              src=${data.post[(postNumber = getRandomNr())].acf.main_image.url}
              alt="${data.post[postNumber].acf.main_image_name}"
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
              alt="${data.post[postNumber].acf.secondary1_image_name}"
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
              alt="${data.post[postNumber].acf.secondary2_image_name}"
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
              alt="${data.post[postNumber].acf.main_image_name}"
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
              alt="${data.post[postNumber].acf.secondary1_image_name}"
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
              alt="${data.post[postNumber].acf.secondary2_image_name}"
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
              alt="${data.post[postNumber].acf.main_image_name}"
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
              alt="${data.post[postNumber].acf.secondary1_image_name}"
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
              alt="${data.post[postNumber].acf.secondary2_image_name}"
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
              alt="${data.post[postNumber].acf.main_image_name}"
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
              alt="${data.post[postNumber].acf.secondary1_image_name}"
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
              alt="${data.post[postNumber].acf.secondary2_image_name}"
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

window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;

  if (Math.ceil(scrolled) === scrollable) {
    showLoading();
  }
});

function showLoading() {
  loading.classList.add('show');
  setTimeout(fetchUsers, 500);
}

function getRandomNr() {
  let random = Math.floor(Math.random() * 22);
  return random;
}

fetchUsers();

const api =
  "https://emilbacklund.flywheelsites.com/wp-json/wp/v2/posts?acf_format=standard&per_page=12";

const galleryImages = document.querySelectorAll(".image");
const username = document.querySelectorAll(".username");
const modalText = document.querySelector(".modal-text");

console.log(galleryImages);

async function fetchUsers() {
  try {
    const response = await fetch(api);
    const userData = await response.json();

    for (i = 0; i < userData.length; i++) {
      const data = userData[i].acf;
      let artistName = data.artist_name;
      let mainImage = data.main_image.url;
      let mainImageAlt = data.main_image.alt;
      let mainImageName = data.main_image_name;

      galleryImages[i].innerHTML += `
        <img
                  src=${mainImage}
                  alt=${mainImageAlt}
                />
        `;

      username[i].innerHTML += `${artistName}`;
    }

    // Modal starts:
    //! This is loading after the above is finnished
    const images = document.querySelectorAll(".image img");
    const modal = document.querySelector(".modal");
    const modalImg = document.querySelector(".modal-image");
    const closeModal = document.querySelector(".close");
    const nextBtn = document.querySelector(".next-button");
    const prevBtn = document.querySelector(".prev-button");

    images.forEach((image, index) => {
      image.addEventListener("click", () => {
        modalImg.src = image.src;
        modalText.innerHTML = image.alt;
        modal.classList.add("appear");

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
        });
      });
    });
    // Modal ends

    for (i = 0; i < images.length; i++) {
      images[i].setAttribute("draggable", false);
      modalImg.setAttribute("draggable", false);
    }

    console.log(userData);
  } catch (error) {}
}

fetchUsers();

const api =
  "https://emilbacklund.flywheelsites.com/wp-json/wp/v2/posts?acf_format=standard&per_page=12";
const card = document.querySelectorAll(".card");
const carouselSlide = document.querySelector(".carousel-slide");

async function fetchUsers() {
  try {
    const response = await fetch(api);
    const userData = await response.json();

    for (i = 0; i < userData.length; i++) {
      const data = userData[i].acf;
      let artistName = data.artist_name;
      let mainImage = data.main_image.url;
      let mainImageAlt = data.main_image.alt;

      card[
        i
      ].attributes.onclick.nodeValue = `javascript:window.location='/detailpage.html?id=${userData[i].id}'`;

      card[i].innerHTML += `
      <img src=${mainImage} alt=${mainImageAlt} />
      <div class="artist-name-card">
        <h2 class="artist-name">${artistName}</h2>
      </div>
      <div class="card-info">
        <p>See more of ${artistName}</p>
      </div>
      `;
    }
  } catch (error) {}
}

fetchUsers();

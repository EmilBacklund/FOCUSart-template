const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get('id');

const url = `https://emilbacklund.flywheelsites.com/wp-json/wp/v2/posts/${id}?acf_format=standard`;

const paragraph1 = document.querySelector('.paragraph_1');
const paragraph2 = document.querySelector('.paragraph_2');
const section1 = document.querySelector('.section_1');
const section2 = document.querySelector('.section_2');
const email = document.querySelector('.email');
const phoneNumber = document.querySelector('.phone-number');
const links = document.querySelector('.links');
const social = document.querySelector('.social');
const header = document.querySelector('.profile-header');

header.innerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;

async function fetchDetails() {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    const userDetail = jsonData.acf;

    console.log(userDetail);

    document.title = `Focusart | ${userDetail.artist_name} | Find ${userDetail.artist_name}'s Latest Artwork And Other Platforms`;
    document.querySelector(
      'meta[name="description"]'
    ).content = `Check out ${userDetail.artist_name}'s art on Focusart. Browse the user profile and find other platforms and social media the artist is using.`;

    header.innerHTML = `
    <div class="artist-name-card">
            <h2 class="artist-name">${userDetail.artist_name}</h2>
          </div>
          <img class="main-picture" src=${userDetail.main_image.url} alt="" />
          <img class="profile-pic" src="" alt="" />
    `;

    section1.innerHTML = `<p class="paragraph_1">${userDetail.paragraph}</p>
    <img class="detail-img secondary-image_1" src=${userDetail.secondary1_image.url} alt="" />`;

    section2.innerHTML = `<p class="paragraph_2">${userDetail.paragraph2}</p>
    <img class="detail-img secondary-image_2" src=${userDetail.secondary2_image.url} alt="" />`;

    if (!userDetail.email) {
      email.innerHTML = `N/A`;
      email.attributes.href.nodeValue = '';
      email.style.pointerEvents = 'none';
    } else {
      email.innerHTML = `${userDetail.email}`;
      email.attributes.href.nodeValue = `mailto: ${userDetail.email}`;
    }

    if (!userDetail.number) {
      phoneNumber.innerHTML = `N/A`;
      phoneNumber.attributes.href.nodeValue = '';
      phoneNumber.style.pointerEvents = 'none';
    } else {
      phoneNumber.innerHTML = `${userDetail.number}`;
      phoneNumber.attributes.href.nodeValue = `tel:${userDetail.number}`;
    }

    const allLinks = `<a href="${userDetail.link1}" target="_blank">${userDetail.link1}</a>
    <a href="${userDetail.link2}" target="_blank">${userDetail.link2}</a>
    <a href="${userDetail.link3}" target="_blank">${userDetail.link3}</a>
    <a href="${userDetail.link4}" target="_blank">${userDetail.link4}</a>
    <a href="${userDetail.link5}" target="_blank">${userDetail.link5}</a>`;

    links.innerHTML = `
    <p class="emph-text">Links:</p>
    ${allLinks}
    `;

    const allAnchorTags = document.querySelectorAll('.links a');

    for (let removeEmpty of allAnchorTags) {
      if (removeEmpty.innerHTML === '') {
        removeEmpty.parentNode.removeChild(removeEmpty);
      }
    }

    const socialIcons = [
      userDetail.social_icon_behance.url,
      userDetail.social_icon_devianart.url,
      userDetail.social_icon_facebook.url,
      userDetail.social_icon_instagram.url,
      userDetail.social_icon_pinterest.url,
      userDetail.social_icon_tublr.url,
      userDetail.social_icon_twitter.url,
      userDetail.social_icon_vk.url,
      userDetail.social_icon_youtube.url,
      userDetail.social_icon_etsy.url,
      userDetail.social_icon_patreon.url,
      userDetail.social_icon_tiktok.url,
    ];

    const socialLinks = [
      userDetail.social_link_behance,
      userDetail.social_link_devianart,
      userDetail.social_link_facebook,
      userDetail.social_link_instagram,
      userDetail.social_link_pinterest,
      userDetail.social_link_tumblr,
      userDetail.social_link_twitter,
      userDetail.social_link_vk,
      userDetail.social_link_youtube,
      userDetail.social_link_etsy,
      userDetail.social_link_patreon,
      userDetail.social_link_tiktok,
    ];

    const socialTitle = [
      userDetail.social_icon_behance.title,
      userDetail.social_icon_devianart.title,
      userDetail.social_icon_facebook.title,
      userDetail.social_icon_instagram.title,
      userDetail.social_icon_pinterest.title,
      userDetail.social_icon_tublr.title,
      userDetail.social_icon_twitter.title,
      userDetail.social_icon_vk.title,
      userDetail.social_icon_youtube.title,
      userDetail.social_icon_etsy.title,
      userDetail.social_icon_patreon.title,
      userDetail.social_icon_tiktok.title,
    ];

    for (i = 0; i < socialIcons.length; i++) {
      if (socialIcons[i]) {
        console.log(socialIcons[i]);
        social.innerHTML += `
    <a href=${socialLinks[i]} title="${userDetail.artist_name} on ${socialTitle[i]}" target="_blank">
    <img
      class="social-icons"
      src=${socialIcons[i]}
    />
  </a>
    `;
      }
    }
  } catch (error) {}
}

fetchDetails();

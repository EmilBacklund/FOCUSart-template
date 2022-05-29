const mainPicture = document.querySelector('.main-picture');
const profilePicture = document.querySelector('.profile-pic');
const detailImages = document.querySelectorAll('.detail-img');

for (i = 0; i < detailImages.length; i++) {
  detailImages[i].setAttribute('draggable', false);
  mainPicture.setAttribute('draggable', false);
  profilePicture.setAttribute('draggable', false);
}

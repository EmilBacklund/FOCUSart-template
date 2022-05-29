const toggleMode = document.querySelectorAll('.toggle-mode');
let lightMode = localStorage.getItem('lightMode');

const enableLightMode = () => {
  document.body.classList.add('light-mode');
  localStorage.setItem('lightMode', 'enabled');
};

const disableLightMode = () => {
  document.body.classList.remove('light-mode');
  localStorage.setItem('lightMode', null);
};

if (lightMode === 'enabled') {
  enableLightMode();
}

for (let i = 0; i < toggleMode.length; i++) {
  toggleMode[i].addEventListener('click', () => {
    lightMode = localStorage.getItem('lightMode');
    if (lightMode !== 'enabled') {
      enableLightMode();
    } else {
      disableLightMode();
    }
  });
}

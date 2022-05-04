const toggleMode = document.getElementById("toggleMode");
let lightMode = localStorage.getItem("lightMode");

const enableLightMode = () => {
  document.body.classList.add("light-mode");
  localStorage.setItem("lightMode", "enabled");
};

const disableLightMode = () => {
  document.body.classList.remove("light-mode");
  localStorage.setItem("lightMode", null);
};

if (lightMode === "enabled") {
  enableLightMode();
}

toggleMode.addEventListener("click", () => {
  lightMode = localStorage.getItem("lightMode");
  if (lightMode !== "enabled") {
    enableLightMode();
    console.log("Lightmode: ", lightMode);
  } else {
    disableLightMode();
  }
});

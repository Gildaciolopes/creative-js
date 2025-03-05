let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");
let container = document.querySelector(".container");
let items = container.querySelectorAll(".list .item");
let indicator = document.querySelector(".indicators");
let dots = indicator.querySelectorAll("ul li");
let list = container.querySelector(".list");

let active = 0;
let lastPosition = items.length - 1;
let autoplayInterval = null;
let autoplayDelay = 5000; // 5 segundos

function updateSlide(index) {
  container.querySelector(".list .item.active").classList.remove("active");
  indicator.querySelector("ul li.active").classList.remove("active");

  active = index;
  items[active].classList.add("active");
  dots[active].classList.add("active");

  indicator.querySelector(".number").textContent = `0${active + 1}`;
}

function nextSlide() {
  list.style.setProperty("--calculation", 1);
  let nextIndex = active + 1 > lastPosition ? 0 : active + 1;
  updateSlide(nextIndex);
}

function prevSlide() {
  list.style.setProperty("--calculation", -1);
  let prevIndex = active - 1 < 0 ? lastPosition : active - 1;
  updateSlide(prevIndex);
}

nextButton.onclick = () => {
  nextSlide();
  restartAutoplay();
};

prevButton.onclick = () => {
  prevSlide();
  restartAutoplay();
};

dots.forEach((dot, index) => {
  dot.onclick = () => {
    updateSlide(index);
    restartAutoplay();
  };
});

// Autoplay
function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, autoplayDelay);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

function restartAutoplay() {
  stopAutoplay();
  startAutoplay();
}

// Iniciar autoplay ao carregar a página
startAutoplay();

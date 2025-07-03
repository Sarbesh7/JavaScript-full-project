// Loading Bar Animation
let progress = 1;
let fontSize = 10;

const loadingBarInterval = setInterval(() => {
  const bar = document.getElementById("bar-section");

  bar.innerHTML = progress + "%";
  bar.style.width = progress + "%";
  bar.style.fontSize = fontSize + "px";

  if (progress >= 100) {
    clearInterval(loadingBarInterval);
    bar.innerHTML = "Done ✅";
    bar.style.width = "100%";
  }

  fontSize += 0.1;
  progress++;
}, 100);

// Dot Loading Animation
let dot = ".";
const dotLoadingInterval = setInterval(() => {
  const loadingEl = document.getElementById("loading-section");
  loadingEl.innerHTML = dot;
  dot += ".";
  if (dot.length > 3) {
    dot = ".";
  }
}, 500);

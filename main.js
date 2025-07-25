// Starfield background
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

const cloudsCanvas = document.getElementById("clouds");
const cloudsCtx = cloudsCanvas.getContext("2d");

let stars = [];
let clouds = [];
let shootingStars = [];


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cloudsCanvas.width = window.innerWidth;
  cloudsCanvas.height = window.innerHeight;

  stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2,
    dx: Math.random() * 0.2 + 0.05,
    alpha: Math.random(),
    fade: 0.005 + Math.random() * 0.01
  }));

  createClouds();
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.x -= star.dx;
    if (star.x < 0) star.x = canvas.width;
    star.alpha += star.fade;
    if (star.alpha <= 0.2 || star.alpha >= 1) star.fade *= -1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);

  // Occasionally create a new shooting star
  if (Math.random() < 0.002) {
    shootingStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      length: 100 + Math.random() * 100,
      speed: 4 + Math.random() * 2,
      alpha: 1,
      life: 0,
    });
  }
  
  

// Draw and animate shooting stars
for (let i = shootingStars.length - 1; i >= 0; i--) {
  const star = shootingStars[i];
  ctx.beginPath();
  ctx.moveTo(star.x, star.y);
  ctx.lineTo(star.x + star.length, star.y + star.length * 0.2);
  ctx.strokeStyle = `rgba(255,255,255,${star.alpha})`;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Move it
  star.x += star.speed;
  star.y += star.speed * 0.2;
  star.alpha -= 0.01;
  star.life++;

  // Remove if faded
  if (star.alpha <= 0 || star.life > 100) {
    shootingStars.splice(i, 1);
  }
}

}

// Galactic Clock
function updateClock() {
  const clock = document.getElementById("galactic-clock");
  const now = new Date();
  clock.textContent = `🌌 Galactic Time: ${now.toLocaleTimeString()}`;
}

// Modal logic
function openModal(id) {
  const template = document.getElementById(id);
  const body = document.getElementById("modal-body");
  body.innerHTML = "";
  body.appendChild(template.content.cloneNode(true));
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Theme toggle logic
const darkBtn = document.getElementById("dark-mode");
const lightBtn = document.getElementById("light-mode");

function setTheme(mode) {
  document.documentElement.setAttribute("data-theme", mode);
  if (mode === "light") {
    cloudsCanvas.style.display = "block";
  } else {
    cloudsCanvas.style.display = "none";
  }
}

darkBtn.addEventListener("click", () => setTheme("dark"));
lightBtn.addEventListener("click", () => setTheme("light"));

// Clouds animation (for light theme)
function createClouds() {
  clouds = [];
  for (let i = 0; i < 20; i++) {
    clouds.push({
      x: Math.random() * cloudsCanvas.width,
      y: Math.random() * cloudsCanvas.height * 0.5,
      size: 60 + Math.random() * 80,
      speed: 0.1 + Math.random() * 0.15,
      alpha: 0.15 + Math.random() * 0.1,
    });
  }
}

function drawClouds() {
  cloudsCtx.clearRect(0, 0, cloudsCanvas.width, cloudsCanvas.height);

  clouds.forEach(c => {
    c.x += c.speed;
    if (c.x > cloudsCanvas.width + c.size) c.x = -c.size;

    let gradient = cloudsCtx.createRadialGradient(
      c.x,
      c.y,
      c.size * 0.3,
      c.x,
      c.y,
      c.size
    );
    gradient.addColorStop(0, `rgba(255,255,255,${c.alpha})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    cloudsCtx.fillStyle = gradient;
    cloudsCtx.beginPath();
    cloudsCtx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
    cloudsCtx.fill();
  });

  requestAnimationFrame(drawClouds);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawStars();
drawClouds();
setInterval(updateClock, 1000);
updateClock();


function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  const defaultTheme = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(savedTheme || defaultTheme);
}

initializeTheme(); // 👈 Set theme on load
resizeCanvas();
drawStars();
drawClouds();
setInterval(updateClock, 1000);
updateClock();


document.addEventListener('DOMContentLoaded', () => {
  // Delegated event listener for dynamically loaded FAQ
  document.body.addEventListener('click', function (e) {
    if (e.target.closest('.faq-question')) {
      const question = e.target.closest('.faq-question');
      const item = question.parentElement;

      // Toggle open class
      item.classList.toggle('open');

      // Close others if you want accordion effect
      // document.querySelectorAll('.faq-item').forEach(faq => {
      //   if (faq !== item) faq.classList.remove('open');
      // });
    }
  });
});


const arrow = document.getElementById("floating-arrow");
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

arrow.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - arrow.offsetLeft;
  offsetY = e.clientY - arrow.offsetTop;
  arrow.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    arrow.style.left = `${e.clientX - offsetX}px`;
    arrow.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  arrow.style.cursor = "grab";
});



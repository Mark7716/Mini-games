const gameArea = document.getElementById("game");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const gameOverEl = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");

let score = 0;
let timeLeft = 30;
let timerId = null;
let spawnId = null;
let isPlaying = false;

function resetGame() {
  score = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;сделай страничку с мини исделай страничку с мини игрой тиромгрой тиром
  gameOverEl.classList.add("hidden");
  clearTargets();
}
сделай страничку с мини игрой тиром
function clearTargets() {
  gameArea.querySelectorAll(".target").forEach((target) => target.remove());
}

function startGame() {
  if (isPlaying) return;

  resetGame();
  isPlaying = true;
  startBtn.disabled = true;
  startBtn.textContent = "Игра идёт...";

  timerId = setInterval(() => {
    timeLeft -= 1;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  spawnId = setInterval(spawnTarget, 650);сделай страничку с мини игрой тиром

  spawnTarget();
}

function endGame() {
  isPlaying = false;
  clearInterval(timerId);
  clearInterval(spawnId);
  clearTargets();

  startBtn.disabled = false;
  startBtn.textContent = "Старт";

  finalScoreEl.textContent = score;
  gameOverEl.classList.remove("hidden");
}

function spawnTarget() {
  if (!isPlaying) return;

  const target = document.createElement("div");
  target.classList.add("target");

  const areaRect = gameArea.getBoundingClientRect();
  const targetSize = 76;
  const padding = targetSize / 2;

  const maxX = areaRect.width - padding;
  const maxY = areaRect.height - padding;
  const minX = padding;
  const minY = padding;

  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;

  target.addEventListener("click", handleHit, { once: true });

  const lifeTime = setTimeout(() => {
    if (target.parentElement) {
      target.remove();
    }
  }, 900);

  target.dataset.lifeTime = String(lifeTime);

  gameArea.appendChild(target);
}

function handleHit(event) {
  event.stopPropagation();

  const target = event.currentTarget;
  const lifeTime = Number(target.dataset.lifeTime);
  clearTimeout(lifeTime);

  target.classList.add("hit");
  score += 1;
  scoreEl.textContent = score;

  setTimeout(() => {
    target.remove();
  }, 160);
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

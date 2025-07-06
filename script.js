let timer;
let isRunning = false;
let isFocus = true;
let sessionCount = 0;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const focusInput = document.getElementById("focusTime");
const breakInput = document.getElementById("breakTime");
const sessionText = document.getElementById("sessions");
const modeToggle = document.getElementById("modeToggle");

function updateDisplay(mins, secs) {
  timerDisplay.textContent = String(mins).padStart(2, '0') + ":" + String(secs).padStart(2, '0');
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  let minutes = isFocus ? parseInt(focusInput.value) : parseInt(breakInput.value);
  let seconds = 0;

  updateDisplay(minutes, seconds);

  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        isRunning = false;
        if (isFocus) sessionCount++;
        sessionText.textContent = sessionCount;
        isFocus = !isFocus;
        startTimer();
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay(minutes, seconds);
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isFocus = true;
  updateDisplay(parseInt(focusInput.value), 0);
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
modeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", modeToggle.checked);
  document.body.classList.toggle("light", !modeToggle.checked);
});
updateDisplay(parseInt(focusInput.value), 0);

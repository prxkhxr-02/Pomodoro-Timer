const workTimer = document.getElementById('work-timer');
const shortTimer = document.getElementById('short-timer');
const longTimer = document.getElementById('long-timer');

shortTimer.style.display = "none";
longTimer.style.display = "none";

const timerOptionBtns = document.querySelectorAll('.timer-option button');
const timerSettingsBtns = document.querySelectorAll('.timer-settings button');

document.getElementById('reset-button').style.display = "none"
document.getElementById('continue-button').style.display = "none"
document.getElementById('pause-button').style.display = "none"

let intervalId;
let isRunning = false;
let currentTimer = "work";
let minutes, seconds;

function updateTimerDisplay() {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10  && seconds != 0 ? `0${seconds}` : `${seconds}`;
  
    workTimer.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
  }
  

function startTimer() {
    if (isRunning) return;

  isRunning = true;
  intervalId = setInterval(function () {
    if (seconds > 0) {
      seconds--;
    } else {
      if (minutes === 0) {
        clearInterval(intervalId);
        isRunning = false;
        switchTimer();
      } else {
        seconds = 59;
        minutes--;
      }
    }

    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (!isRunning) return;

  clearInterval(intervalId);
  isRunning = false;
}

function resetTimer() {
  stopTimer();
  if (currentTimer === "work") {
    minutes = 25;
  } else if (currentTimer === "short") {
    minutes = 5;
  } else {
    minutes = 15;
  }
  seconds = '00';
  updateTimerDisplay();
}

function switchTimer() {
  if (currentTimer === "work") {
    currentTimer = "short";
    shortTimer.style.display = "block";
    workTimer.style.display = "none";
    minutes = 5;
  } else if (currentTimer === "short") {
    currentTimer = "long";
    longTimer.style.display = "block";
    shortTimer.style.display = "none";
    minutes = 15;
  } else {
    currentTimer = "work";
    workTimer.style.display = "block";
    longTimer.style.display = "none";
    minutes = 25;
  }
  seconds = '00';
  updateTimerDisplay();
  resetTimer();
}

timerOptionBtns.forEach(button => {
  button.addEventListener('click', () => {
    timerOptionBtns.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    if (button.id === "work-button") {
      currentTimer = "work";
    } else if (button.id === "short-button") {
      currentTimer = "short";
    } else {
      currentTimer = "long";
    }

    resetTimer();
  });
});

timerSettingsBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (button.id === "start-button") {
        document.getElementById('start-button').style.display = "none";
        document.getElementById('reset-button').style.display = "";
        document.getElementById('pause-button').style.display = "";
        startTimer();
    } else if (button.id === "pause-button") {
        document.getElementById('continue-button').style.display = "";
        document.getElementById('pause-button').style.display = "none";
        stopTimer();
    } else if (button.id === "continue-button") {
        document.getElementById('pause-button').style.display = "";
        document.getElementById('continue-button').style.display = "none";
        startTimer();
    } else if (button.id === "reset-button") {
        document.getElementById('start-button').style.display = "";
        document.getElementById('reset-button').style.display = "none";
        document.getElementById('pause-button').style.display = "none";
        document.getElementById('continue-button').style.display = "none";
        resetTimer();
    }
  });
});

resetTimer();

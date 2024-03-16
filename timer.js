let timerInterval;
let timerRunning = false;
let startTime;
let elapsedTime = 0;

const timerDisplay = document.getElementById('timer');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');

// Funktio jolla käynnistetään tai pysäytetään ajastin
function startStopTimer() {
    if (!timerRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 1000);
        startStopButton.textContent = 'Stop';
    } else {
        clearInterval(timerInterval);
        startStopButton.textContent = 'Start';
    }
    timerRunning = !timerRunning;
}

// Funktio laskee kuluneen ajan ja välittää sen displayTime-funktioon
function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    displayTime(elapsedTime);
}

// Funktio asettaa ajastimeen arvot
function displayTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Funktio asettaa minuuttien ja sekuntien eteen nollan jos luku on alle 10
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Funktio palauttaa ajastimen alkuasentoon
function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    elapsedTime = 0;
    displayTime(elapsedTime);
    startStopButton.textContent = 'Start';
}

startStopButton.addEventListener('click', startStopTimer);
resetButton.addEventListener('click', resetTimer);

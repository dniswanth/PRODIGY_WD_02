let timer; // Timer variable
let isRunning = false; // Flag to check if stopwatch is running
let time = 0; // Time in milliseconds
let lapCount = 0; // Lap count

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStopButton');
const lapButton = document.getElementById('lapButton');
const resetButton = document.getElementById('resetButton');
const lapTableBody = document.querySelector('#lapTable tbody');

function formatTime(time) {
  const milliseconds = time % 1000;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startStopButton.textContent = 'Start';
  } else {
    timer = setInterval(updateTime, 1); // Update every millisecond
    isRunning = true;
    startStopButton.textContent = 'Stop';
  }
}

function updateTime() {
  time += 1; // Increment by 1 millisecond
  display.textContent = formatTime(time);
}

function lap() {
  if (isRunning) {
    lapCount++;
    const lapTime = formatTime(time);
    const row = lapTableBody.insertRow();
    const lapCell = row.insertCell(0);
    const timeCell = row.insertCell(1);
    lapCell.textContent = lapCount;
    timeCell.textContent = lapTime;
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  time = 0;
  display.textContent = '00:00:00:000';
  startStopButton.textContent = 'Start';
  lapCount = 0;
  lapTableBody.innerHTML = '';
}

startStopButton.addEventListener('click', startStop);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);

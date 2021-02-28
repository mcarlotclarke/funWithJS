let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countDown);
  // get current time
  const now = Date.now();
  // get later time (multiply because now is in milliseconds)
  const then = now + seconds * 1000;
  // show the initial seconds left
  displayTimeLeft(seconds);
  displayEndTime(then);

  // display amount of time left every single second
  countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop setInterval for it will keep running
    if (secondsLeft < 0) {
      clearInterval(countDown);
      // eslint-disable-next-line no-useless-return
      return;
    }
    // display seconds left
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.round(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timeStamp) {
  const end = new Date(timeStamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time, 10);
  timer(seconds);
}

buttons.forEach((button) => {
  button.addEventListener('click', startTimer);
});

// input your own time
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});

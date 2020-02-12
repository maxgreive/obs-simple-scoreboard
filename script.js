const gameTime = 3600;
let time = gameTime;
const selTimeColon = document.querySelector('.minutes-colon');
const selMinutes = document.querySelector('.minutes');
const selSeconds = document.querySelector('.seconds');

let minutes;
let seconds;
let timeRunning = false;
const root = document.documentElement;

function updateClock() {
  window.setInterval(function() {
    if (timeRunning) {
      time -= 1;
      selTimeColon.classList.toggle('clear');
    } else {
      document.querySelector('.btn-time.pause').textContent = 'Start';
    }

    minutes = Math.floor(Math.abs(time / 60));
    seconds = Math.floor(Math.abs(time % 60));

    selMinutes.textContent = `0${minutes}`.slice(-2);
    selSeconds.textContent = `0${seconds}`.slice(-2);
    if (time < 0) {
      // overtime indicator
      document.querySelector('.overtime-indicator').classList.remove('hidden');
    }
  }, 1000);
}

const selButtons = document.querySelectorAll('.btn-score');
selButtons.forEach(button => {
  button.addEventListener('click', function() {
    const selCorrespondingScore = document.querySelector(`.${button.closest('div').dataset.target}`);
    const currentScore = Number(selCorrespondingScore.dataset.score);
    let newScore = currentScore;
    if (button.classList.contains('add')) {
      newScore = currentScore + 1;
    } else if (button.classList.contains('sub') && newScore > 0) {
      newScore = currentScore - 1;
    } else if (button.classList.contains('reset')) {
      newScore = 0;
    }
    selCorrespondingScore.dataset.score = newScore;
    selCorrespondingScore.textContent = newScore;
  });
});

const selTimeButtons = document.querySelectorAll('.btn-time');
selTimeButtons.forEach(timeButton => {
  timeButton.addEventListener('click', function() {
    if (timeButton.classList.contains('reset')) {
      time = gameTime;
      timeRunning = false;
      document.querySelector('.overtime-indicator').classList.add('hidden');
      selTimeColon.classList.remove('clear');
    }
    if (timeButton.classList.contains('pause')) {
      if (timeRunning) {
        timeButton.textContent = 'Start';
        selTimeColon.classList.remove('clear');
      } else {
        timeButton.textContent = 'Pause';
      }
      timeRunning = !timeRunning;
    }
  });
});

const selAllInputs = document.querySelectorAll('input');
selAllInputs.forEach(input => {
  window.addEventListener('load', function() {
    input.value = '';
  });
});

const selTeamNameInputs = document.querySelectorAll('.inp_teamName');
selTeamNameInputs.forEach(input => {
  const selcorrespondingTeam = document.querySelectorAll(`.${input.dataset.target}`);
  input.addEventListener('input', function() {
    selcorrespondingTeam.forEach(element => {
      element.textContent = input.value.slice(0, 3);
    });
  });
});

const selTeamColorInputs = document.querySelectorAll('.inp_teamColor');
selTeamColorInputs.forEach(input => {
  input.addEventListener('input', function() {
    if (input.dataset.target === 'color-team-home') {
      root.style.setProperty('--home-color', input.value);
    } else if (input.dataset.target === 'color-team-away') {
      root.style.setProperty('--away-color', input.value);
    }
  });
});

updateClock();
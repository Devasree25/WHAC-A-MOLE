const squares = document.querySelectorAll('.square');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countdownTimerId = null;
let moleSpeed = 500; // Mole speed interval (start with 500ms)
let bonusMoleChance = 0.1; // Chance of a bonus mole (10%)

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole', 'bonus');
  });

  // Randomly pick a square and add a mole to it
  const randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole');

  // Randomly decide if this should be a bonus mole (extra points)
  if (Math.random() < bonusMoleChance) {
    randomSquare.classList.add('bonus');
  }

  hitPosition = randomSquare.id;
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;

      // Increase the difficulty (reduce mole speed)
      if (result % 5 === 0 && moleSpeed > 200) {
        moleSpeed -= 50; // Decrease interval to make moles appear faster
        clearInterval(timerId);
        moveMole(); // Restart mole movement with new speed
      }
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, moleSpeed);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countdownTimerId);
    clearInterval(timerId);
    alert('GAME OVER! Your final score is ' + result);
  }
}

moveMole();
countdownTimerId = setInterval(countDown, 1000);

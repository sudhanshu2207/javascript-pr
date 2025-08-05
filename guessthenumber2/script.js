const difficultySelect = document.querySelector('#difficulty');

function setDifficulty() {
  const level = difficultySelect.value;
  let maxNum, maxGuesses;

  if (level === 'easy') {
    maxNum = 50;
    maxGuesses = 15;
  } else if (level === 'medium') {
    maxNum = 100;
    maxGuesses = 10;
  } else {
    maxNum = 200;
    maxGuesses = 5;
  }

  return { maxNum, maxGuesses };
}

// Initialize game with selected difficulty
let { maxNum, maxGuesses } = setDifficulty();
let randomNumber = Math.floor(Math.random() * maxNum + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');
let prevGuess = [];
let numGuess = 1;
let playGame = true;

difficultySelect.addEventListener('change', () => {
  if (!playGame) return;
  ({ maxNum, maxGuesses } = setDifficulty());
  randomNumber = Math.floor(Math.random() * maxNum + 1);
  resetDisplay();
});

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Enter a number!');
  } else if (guess < 1 || guess > maxNum) {
    alert(`Enter a number between 1 and ${maxNum}`);
  } else {
    prevGuess.push(guess);
    if (numGuess >= maxGuesses) {
      displayGuess(guess);
      displayMessage(`Game Over! The number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
      numGuess++;
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage('🎉 You guessed it right!');
    endGame();
  } else if (guess < randomNumber) {
    displayMessage('Too low! 🔽');
  } else {
    displayMessage('Too high! 🔼');
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}, `;
  remaining.innerHTML = `Remaining guesses: ${maxGuesses - numGuess}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h3>${message}</h3>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Play Again</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function () {
    ({ maxNum, maxGuesses } = setDifficulty());
    randomNumber = Math.floor(Math.random() * maxNum + 1);
    prevGuess = [];
    numGuess = 1;
    resetDisplay();
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  });
}

function resetDisplay() {
  guessSlot.innerHTML = 'Previous guesses: ';
  remaining.innerHTML = `Remaining guesses: ${maxGuesses}`;
  lowOrHi.innerHTML = '';
}


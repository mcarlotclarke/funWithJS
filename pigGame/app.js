// Declare needed variables
let scores, roundScore, activePlayer, isGamePlaying;

const init = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  isGamePlaying = true; // State variable to check if game is/not continuing and stop dice roll

  // Hide dice image at start of the game, set all values to 0
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-1-panel`).classList.remove('active');
  document.querySelector(`.player-0-panel`).classList.add('active');
};

init();

const nextPlayer = () => {
  // Switch player and set roundScore = 0
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  // Set to 0 also in the UI
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // Toggle active player
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //Remove the dice from the UI
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
};

const rollDice = () => {
  if (isGamePlaying) {
    // Roll random number
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    // Display dice image with rolled number
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = `dice-${dice1}.png`;
    document.getElementById('dice-2').src = `dice-${dice2}.png`;

    // Update score only if the roll !== 1 otherwise change current score and switch activePlayer
    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      // Display and add the current active player's score
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
};

// Implement hold/add/check winner function
const holdScoreAddCheckWinner = () => {
  if (isGamePlaying) {
    // Add current score to score
    scores[activePlayer] += roundScore;
    // Update UI with score
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];
    // Grab input score
    const scoreInput = document.querySelector('.final-score').value;
    let winningScore;
    // If input score is valid (not a falsey value) set the winning score
    if (scoreInput) {
      winningScore = scoreInput;
    } else {
      winningScore = 100;
    }
    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      // Update UI
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add('winner');
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove('active');
      isGamePlaying = false;
    } else {
      // Switch player
      nextPlayer();
    }
  }
};

// Set up dice click event
document.querySelector('.btn-roll').addEventListener('click', rollDice);

// Set up hold event et al
document
  .querySelector('.btn-hold')
  .addEventListener('click', holdScoreAddCheckWinner);

// Start new game
document.querySelector('.btn-new').addEventListener('click', init);

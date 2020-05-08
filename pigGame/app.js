/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

NEXT level of rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/

// Declare needed variables
let scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

// Hide dice image at start of the game, set all values to 0
document.getElementById('dice-1').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';

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
};

// Set up dice click event
document.querySelector('.btn-roll').addEventListener('click', () => {
  // Roll random number
  const dice1 = Math.floor(Math.random() * 6) + 1;

  // Display dice image with rolled number
  document.getElementById('dice-1').style.display = 'block';

  document.getElementById('dice-1').src = `dice-${dice1}.png`;

  if (dice1 !== 1) {
    // Add score
    roundScore += dice1;
    document.querySelector(`#score-${activePlayer}`).textContent = roundScore;
  } else {
    nextPlayer();
  }
});

// Implement hold/add function
document.querySelector('.btn-hold').addEventListener('click', () => {
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
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add('winner');
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove('active');
  } else {
    // Switch player - At this point to keep DRY create a func and add it here
    nextPlayer();
  }
});

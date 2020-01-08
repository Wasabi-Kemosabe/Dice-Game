/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 25 points on GLOBAL score wins the game
- Make a function to hide/show dice
- Create the logic for two dices using the same rules as above

*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

  // Disables this button when gamePlaying is false
  if (gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    console.log(`Rolled a ${dice} & ${dice2}`);

    // 2. Display results
    var diceDOM = document.querySelector('#dice1');
    var diceDOM2 = document.querySelector('#dice2');
    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    // 3. Update the round score only if the number was not a 1 and player did not roll a 6 twice in a row
    if (prevRoll === 6 && dice === 6) {
      scores[activePlayer] = 0;
      prevRoll = 0;
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    } else if (dice !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice + dice2;
      prevRoll = dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Switch player
      nextPlayer();
    }
  }

});

document.querySelector('.btn-hold').addEventListener('click', function () {

  // Disables this button when gamePlaying is false
  if (gamePlaying) {
    // Add roundScore to scores array
    scores[activePlayer] += roundScore;

    // Updated the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;

    // Undefined, 0, null, or "" are COERCED to false
    // Anything else is COERCED to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if the player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      // document.querySelector('.dice').style.display = 'none';
      document.getElementById('dice1').style.display = 'none';
      document.getElementById('dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // Switch player
      nextPlayer();
    }
  }

})

function nextPlayer() {

  // Switch player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // document.querySelector('.dice').style.display = 'none';
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // document.querySelector('.dice').style.display = 'none';
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
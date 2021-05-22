'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Variable declaration
let currentScore, scores, activePlayer, isGameOn;

// Functions

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

function init() {
    // Starting conditions

    // Starting Variables
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isGameOn = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

// Initial conditions
init();

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
    if (isGameOn) {
        // Generate random dice roll
        const dice = Math.trunc(Math.random() * 6 + 1);
        // display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `img/dice-${dice}.png`;
        // check for 1
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // Switch the player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (isGameOn) {
        // Add current score to player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        // Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // if yes  then finish the game
            isGameOn = false;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--active');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
        } else {
            // Switch player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function () {
    init();
    isGameOn = true;
});

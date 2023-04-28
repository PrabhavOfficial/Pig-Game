'use strict';

//here slecting the element

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // we use # for selecting ids and . for classes.
const score1El = document.getElementById('score--1'); // this is the another way of selecting specific element with their ids thats why we do not use # here because here we not writing a selector we are only passing in the name of the id that we looking for.
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//here the variables live outside of init function.
let scores, currentScore, activePlayer, playing; // we define bunch of empty variables by using commas.

//initial conditions
const init = function () {
  scores = [0, 0]; // here we think why we name player1 to 0 and player2 to 1 because at the end we store it score in array and as we know array is 0 based thats why.
  currentScore = 0; // here we define currentscore outside because we need to store the score for future also but if we define it under below function it will then in every click roll dice button set to 0.
  activePlayer = 0; // here active player is player 1 always.
  playing = true; // here we playing the game after winning this will become false.

  //IMP NOTE:- here we see we declare variable score, currentScore , activePlayer and playing inside init function because of that these are not accessible outside of the function so we say that they are scoped in this init func. so the solution of this to using these variables to define them outside without any value and remove (const and let) inside of init function.

  score0El.textContent = 0; //here we specify value in numbers but JS will automatically convert them to strings to display them on the page.
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden'); // .add property of classList is used here to hide the dice.
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); // after reseting the game active player is player0.
  player1El.classList.remove('player--active');
};
init(); // here we called this above function to run whole above execution.

//here we create function for switching player and use whenever we needed.
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling Dice functionality
btnRoll.addEventListener('click', function () {
  //if playing all btn should work.
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // here we know that dice will be a no. between 1 & 6 and now according to these no. we want to display one these imported images we use .src just like we use in Html and now we can set it to a string and that string will then be the name of the image displayed. :- so with this we can dynamically load one of these six images here depending on the random roll dice.

    //3.Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // here we select the score element dynamically based on which is the active player right now.
      // current0El.textContent = currentScore; //CHANGE LATER- here we add dice to current score for player1 only
    } else {
      // Switch to new player
      // document.getElementById(`current--${activePlayer}`).textContent = 0; // suppose player0 was playing and then we switch to player 1 but before we do that switch we need to change the current score of player0 back to 0 thats why we do this before switching.
      // activePlayer = activePlayer === 0 ? 1 : 0; // here we using ternary operator for switching of players
      // currentScore = 0; // here when we switch to player the current score will set to 0.
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active'); // with the help of toggle if player 0 it will remove the class if its there if its not it will add it.
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to Active Player's score.
    scores[activePlayer] += currentScore; // when activePlayer is 1 then it will become scores[1] and vice-versa.
    //(scores[1] = scores[1] + currentScore)
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // here we display player score and we replace score 0 and 1 dynamically.

    //2. Check if Player's score is >= 100.
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;

      diceEl.classList.add('hidden'); // remove dice icon after winning the game.

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--player'); // this is because when player win active player class should remove but if we dont remove then we have winner class at same of active player class.
    } else {
      //3.Switch to next player.
      switchPlayer(); // here we calling the function because when we click hold button the current score will added to players score and then switch the players.
    }
  }
});

btnNew.addEventListener('click', init); // here we do not call init func. JS will automatically call this func.

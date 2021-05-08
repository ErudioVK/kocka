// definiálunk egy új változót az előző dobás pontjainak - previousScore 
let scores, roundScore, activePlayer, previousScore;

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  // az új változó induló értéke
  previousScore = 0;

  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;

  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

init();
document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', function () {
  let dice = Math.floor(Math.random() * 6) + 1;
  let diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.setAttribute('src', 'dice-' + dice + '.png');
  // Új vizsgálat, elágazás: ha a játékos előző dobása és a mostani  6, akkor elveszíti a játéko és a következő játékos jön
  if (dice === 6 && previousScore === 6) {
    scores[activePlayer] = 0;
    document.querySelector('#current-' + activePlayer).textContent = 0;
    nextPlayer();
  } else {
    if (dice !== 1) {
      roundScore = roundScore + dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }

  previousScore = dice;
  // console.log(previousScore);
});

function nextPlayer() {
  document.querySelector('#current-' + activePlayer).textContent = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  roundScore = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function () {
  scores[activePlayer] = scores[activePlayer] + roundScore;
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  if (scores[activePlayer] >= 20) {
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
  } else {
    nextPlayer();
  }
});

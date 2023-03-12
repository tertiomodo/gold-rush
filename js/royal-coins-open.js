// Open the game screen and check the storage
document.addEventListener('DOMContentLoaded', () => {
  const lobby = document.querySelector('.lobby');
  const footer = document.querySelector('.footer');
  const royalCoins = document.querySelector('.royal-coins');
  const gameBtn = document.getElementById('royal-coins');
  const main = document.querySelector('.main');
  const backBtn = document.querySelector('.header__back-btn');
  const winText = document.querySelector('.footer__win-text');
  const winSum = document.querySelector('.footer__win-sum');

  // Check the storage
  function getState() {
    return sessionStorage.getItem('Current state');
  }

  if (getState() === 'Royal Coins') {
    lobby.classList.add('hide');
    footer.classList.remove('hide');
    royalCoins.classList.remove('hide');
    main.classList.add('royal-coins-bg');
    backBtn.classList.remove('hide');
  }

  // Open the game after click on game image
  gameBtn.addEventListener('click', () => {
    saveState('Royal Coins');

    lobby.classList.add('hide');
    footer.classList.remove('hide'); //
    royalCoins.classList.remove('hide');
    main.classList.add('royal-coins-bg');
    backBtn.classList.remove('hide');
  });

  // Exit the game after click on back button
  backBtn.addEventListener('click', () => {
    deleteState('Current state');
    saveState('Lobby');

    lobby.classList.remove('hide');
    footer.classList.add('hide');
    royalCoins.classList.add('hide');
    main.classList.remove('royal-coins-bg');
    backBtn.classList.add('hide');
    winText.textContent = '';
    winSum.textContent = '';
  });

  // Save the state
  function saveState(state) {
    sessionStorage.setItem('Current state', state);
  }

  // Delete the state
  function deleteState(state) {
    sessionStorage.removeItem(state);
  }
});
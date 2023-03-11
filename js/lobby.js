document.addEventListener('DOMContentLoaded', () => {
  const lobby = document.querySelector('.lobby');
  function getState() {
    return sessionStorage.getItem('Current state');
  }

  if (getState() === 'Lobby') {
    lobby.classList.remove('hide');
  }
});
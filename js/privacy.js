// Check storage and save your choice
document.addEventListener('DOMContentLoaded', () => {
  const privacy = document.querySelector('.privacy');
  const button = document.querySelector('.privacy__button');
  const lobby = document.querySelector('.lobby');

  const storageCheck = sessionStorage.getItem('Privacy Policy');

  if (!storageCheck || storageCheck === null) {
    privacy.classList.remove('hide');
    button.addEventListener('click', () => {
      lobby.classList.remove('hide');
      privacy.classList.add('hide');
      saveAccept(true);
      saveState('Lobby');
    });
  }

  // Save privacy policy information
  function saveAccept(accept) {
    sessionStorage.setItem('Privacy Policy', accept);
  }

  // Save lobby state
  function saveState(state) {
    sessionStorage.setItem('Current state', state);
  }
});
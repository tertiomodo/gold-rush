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
    });
  }

  // Save privacy policy information
  function saveAccept(accept) {
    sessionStorage.setItem('Privacy Policy', JSON.stringify(accept));
  }
});
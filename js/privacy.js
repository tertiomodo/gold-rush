document.addEventListener('DOMContentLoaded', () => {
  const privacy = document.querySelector('.privacy');
  const button = document.querySelector('.privacy__button');

  const storageCheck = localStorage.getItem('Privacy Policy');

  if (!storageCheck || storageCheck === null) {
    privacy.classList.remove('hide');
    button.addEventListener('click', () => {
      privacy.classList.add('hide');
      let privacyAccept = true;
      saveAccept(privacyAccept);
    });
  }

  function saveAccept(accept) {
    localStorage.setItem('Privacy Policy', JSON.stringify(accept));
  }
});
// Game logic and shuffle functions
document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.royal-coins__slots-boxes');
  const spinBtn = document.querySelector('.footer__btn-spin');
  const autoBtn = document.querySelector('.footer__btn-auto');

  spinBtn.addEventListener('click', () => {
    spin();
  });

  let interval;
  autoBtn.addEventListener('click', () => {
    if (!autoBtn.hasAttribute('data-auto')) {
      autoBtn.setAttribute('data-auto', 'active');

      spin();

      interval = setInterval(() => {
        spin();
      }, 5000);
    } else {
      clearInterval(interval);
      autoBtn.removeAttribute('data-auto');
    }
  });

  function spin() {
    boxes.forEach(item => {
      item.classList.add('animation');
    });

    shuffle();
    
    const timeoutFirst = setTimeout(() => {
      boxes[0].classList.remove('animation');
      clearTimeout(timeoutFirst);
    }, 2000);

    const timeoutSecond = setTimeout(() => {
      boxes[1].classList.remove('animation');
      clearTimeout(timeoutSecond);
    }, 3000);

    const timeoutThird = setTimeout(() => {
      boxes[2].classList.remove('animation');
      clearTimeout(timeoutThird);
    }, 4000);

    showResult();
  }

  function shuffle() {
    for (let i = 0; i < boxes.length; i++) {
      const box = [...boxes[i].children];

      for (let j = box.length - 1; j >= 0; j--) {
        const random = Math.floor(Math.random() * (j + 1));
        [box[j], box[random]] = [box[random], box[j]];
      }

      box.forEach(item => boxes[i].append(item));
    }

    /* 
    2 - 50% win (numbers: 1 or 0)
    3 - 33% win (numbers: 1 or 0, 2)
    4 - 25% win (numbers: 1 or 0, 2, 3)
    5 - 20% win (numbers: 1 or 0, ... 4)
    6 - 17% win (numbers: 1 or 0, ... 5)
    7 - 14% win (numbers: 1 or 0, ... 6)
    */
    winChance(4);
  }

  // Definition the chance of winning
  function winChance(chance) {
    const random = Math.floor(Math.random() * chance);

    let winId = null;

    // number 1 - win, other numbers - lose
    if (random === 1) {
      for (let i = 0; i < boxes.length; i++) {
        const shuffledCopy = [...boxes[i].children];

        if (i === 0) winId = shuffledCopy[1].getAttribute('data-id');

        if (winId !== null && i > 0) {
          const index = shuffledCopy.findIndex(item => item.getAttribute('data-id') === winId);
          
          [shuffledCopy[1], shuffledCopy[index]] = [shuffledCopy[index], shuffledCopy[1]];
        }

        shuffledCopy.forEach(item => boxes[i].append(item));
      }
    }
  }

  function showResult() {
    const firstSlot = boxes[0].children[1].getAttribute('data-id');
    const secondSlot = boxes[1].children[1].getAttribute('data-id');
    const thirdSlot = boxes[2].children[1].getAttribute('data-id');

    if (firstSlot === secondSlot && firstSlot === thirdSlot && secondSlot === thirdSlot) {
      console.log('YOU WIN!!!');
    }
  }
});
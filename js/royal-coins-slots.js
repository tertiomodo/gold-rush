// Game logic and shuffle functions
document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.royal-coins__slots-boxes');
  const spinBtn = document.querySelector('.footer__btn-spin');
  const autoBtn = document.querySelector('.footer__btn-auto');
  const bet = document.querySelector('.footer__bet');
  const betPlus = document.querySelector('.bet-button-plus');
  const betMinus = document.querySelector('.bet-button-minus');
  const winText = document.querySelector('.footer__win-text');
  const winSum = document.querySelector('.footer__win-sum');
  const money = document.querySelector('.header__money');
  const points = document.querySelector('.current-points');
  const backBtn = document.querySelector('.header__back-btn');
  
  let isActive = false;
  let betSum = 100;
  let balance = 100000;
  let stars = 0;
  
  function getState() {
    const state = sessionStorage.getItem('Current state');
    
    return {state};
  }

  const getMoney = sessionStorage.getItem('Money');
  const getPoints = sessionStorage.getItem('Points');

  if (getMoney !== null) {
    balance = +getMoney;
  } else {
    saveToStorage('Money', balance);
  }

  if (getPoints !== null) {
    stars = +getPoints;
  } else {
    saveToStorage('Points', stars);
  }

  bet.textContent = betSum;
  money.textContent = balance;
  points.textContent = stars;

  betPlus.addEventListener('click', () => {
    if (betSum >= 100000) return;
    if (!isActive) {
      betSum += 100;
      bet.textContent = betSum;
    }
  });

  betMinus.addEventListener('click', () => {
    if (betSum > 0 && !isActive) {
      betSum -= 100;
      bet.textContent = betSum;
    }
  });

  spinBtn.addEventListener('click', () => {
    if (!isActive && betSum > 0 && balance >= betSum && balance > 0 && getState().state === 'Royal Coins') {
      isActive = true;
      balance -= betSum;
      saveToStorage('Money', balance);
      money.textContent = balance;
      spin();
    }
  });

  let interval;
  autoBtn.addEventListener('click', () => {
    if (!isActive && betSum > 0 && balance >= betSum && getState().state === 'Royal Coins') {
      isActive = true;
      balance -= betSum;
      saveToStorage('Money', balance);
      money.textContent = balance;
      spin();
      
      interval = setInterval(() => {
        if (!isActive && betSum > 0 && balance >= betSum && getState().state === 'Royal Coins') {
          isActive = true;
          balance -= betSum;
          saveToStorage('Money', balance);
          money.textContent = balance;
          spin();
        } else {
          clearInterval(interval);
        }
      }, 5000);
      
    } else {
      clearInterval(interval);
    }
  });

  backBtn.addEventListener('click', () => {
    clearInterval(interval);
  });

  function spin() {
    boxes.forEach(item => {
      item.classList.add('animation');
    });

    if (stars < 9000) {
      stars += 100;
      saveToStorage('Points', stars);
    }

    points.textContent = stars;
    winText.textContent = '';
    winSum.textContent = '';

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
      isActive = false;
    }, 4000);

    showWin();
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
    winChance(5);
  }

  // Definition the chance of winning
  function winChance(chance) {
    const random = Math.floor(Math.random() * chance);

    let winId = null;

    // number 1 - win, other numbers - lose
    if (random === 1) {
      for (let i = 0; i < boxes.length; i++) {
        const shuffledCopy = [...boxes[i].children];

        if (i === 0) winId = shuffledCopy[1].getAttribute('data-royal-coins');

        if (winId !== null && i > 0) {
          const index = shuffledCopy.findIndex(item => item.getAttribute('data-royal-coins') === winId);
          
          [shuffledCopy[1], shuffledCopy[index]] = [shuffledCopy[index], shuffledCopy[1]];
        }

        shuffledCopy.forEach(item => boxes[i].append(item));
      }
    }
  }

  function showWin() {
    const firstSlot = boxes[0].children[1].getAttribute('data-royal-coins');
    const secondSlot = boxes[1].children[1].getAttribute('data-royal-coins');
    const thirdSlot = boxes[2].children[1].getAttribute('data-royal-coins');

    if (firstSlot === secondSlot && firstSlot === thirdSlot && secondSlot === thirdSlot) {
      balance += betSum * 5;
      saveToStorage('Money', balance);

      const timeout = setTimeout(() => {
        boxes[2].classList.remove('animation');
        clearTimeout(timeout);
        winText.textContent = 'WIN';
        money.textContent = balance;
        winSum.textContent = betSum * 5;
      }, 4000);
    }
  }

  function saveToStorage(key, value) {
    sessionStorage.setItem(key, value);
  }
});
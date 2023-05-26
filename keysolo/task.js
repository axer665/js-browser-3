class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timeElement = container.querySelector('.status__time');

    this.deadlineTime = 10; // время, дающееся на ввод символа
    this.remainingTime = 0; // оставшееся время на ввод символа
    this.timer; 

    this.reset();
    this.registerEvents();
    this.timeElement.textContent = this.calculate(this.deadlineTime)
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
      addEventListener("keyup", (event) => {
          let currentSymbol = (this.currentSymbol.textContent).toLowerCase();
          let inputSymbol = (event.key).toLowerCase();
          
          // перезапускаем таймер
          this.stopTimer();
          this.runTimer();

          if (event.key.length === 1) { // отсекаем нажатия ненужных нам кнопок (shift, ctrl, F1...)
            if (currentSymbol == inputSymbol) {
              this.success();
            } else {
              this.fail();
            }
          }
      })
  }

  // запуск таймеры
  runTimer() {
    this.timer = setInterval(this.tick, 1000);
  }

  // остановка таймера
  stopTimer() {
    clearInterval(this.timer);
    this.remainingTime = this.deadlineTime;
    this.timeElement.textContent = this.calculate(this.deadlineTime);
  }

  // метод для таймера
  tick = () => {
    if (this.remainingTime > 0) {
      this.remainingTime--;
    } else {
      this.fail();
      this.remainingTime = this.deadlineTime;
    }
    this.timeElement.textContent = this.calculate(this.remainingTime);
  }

  // приводим число к виду 23:59:59 как в задании прошлого модуля 
  calculate(seconds) {
      let currentDate = new Date();
      let deadline = new Date(new Date().setSeconds(currentDate.getSeconds() + Number(seconds))); 
  
      const diff = deadline - currentDate;
  
      const result = {
          hours : diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0,
          minutes : diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0,
          seconds : diff > 0 ? Math.floor(diff / 1000) % 60 : 0,
      };
  
      const hours = result.hours < 10 ? '0' + result.hours : result.hours;
      const minute = result.minutes < 10 ? '0' + result.minutes : result.minutes;
      const second = result.seconds < 10 ? '0' + result.seconds : result.seconds;
  
      return hours + ":" + minute + ":" + second;
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
    this.stopTimer();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
    this.stopTimer();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript',
        'студент',
        'крабики',
        "я люблю kitkat"
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))


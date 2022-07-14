export class BodyGame {
  constructor() {
    this.bodyCollors = ['black', 'white'];

    this.titleBlock = document.querySelector('.title');
    this.startBlock = document.querySelector('.start');
    this.stopBlock = document.querySelector('.stop');
    this.gameOwerBlock = document.querySelector('.game-ower');
    this.pauseBlock = document.querySelector('.pause');
    this.playBlock = document.querySelector('.play');
    this.main = document.querySelector('.main');
  }

  start() {
    this.main.classList.remove('hide');
    this.pauseBlock.classList.remove('hide');
    this.stopBlock.classList.remove('hide');
    this.titleBlock.classList.add('hide');
    this.startBlock.classList.add('hide');
  }

  pause() {
    this.pauseBlock.classList.add('hide');
    this.playBlock.classList.remove('hide');
  }

  resume() {
    this.pauseBlock.classList.remove('hide');
    this.playBlock.classList.add('hide');
  }

  stop() {
    this.titleBlock.classList.remove('hide');
    this.gameOwerBlock.classList.remove('hide');
    this.main.classList.add('hide');
    this.stopBlock.classList.add('hide');
    this.pauseBlock.classList.add('hide');
  }

  /**
	 * Смена основного цвета
	 */
  changeColor() {
    const el = document.querySelector('body');
    let complite = false;

    this.bodyCollors.forEach((item, index) => {
      const nextIndex = (this.bodyCollors.length - 1) > index ? index + 1 : 0;

      if (!complite && el.classList.contains(item)) {
        el.classList.remove(item);
        el.classList.add(this.bodyCollors[nextIndex]);
        complite = true;
      }
    });
  }
}

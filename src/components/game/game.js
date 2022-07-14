import { keyCode, actionCode } from '../../constants/code.constant.js';
import * as Setting from '../../constants/setting.js';

import { Arena } from '../arena/arena.js';
import { View } from '../arena/view.js';
import { Figure } from '../figure/figure.js';

export class Game {
  constructor() {
    this.arena;
    this.figure;
    this.nextFigure;
    this.process;
    this.view;

    /** Уровень */
    this.lavel = 1;
    /** Счёт */
    this.score = Setting.GameSetting.SCOPE;
    /** Сложность */
    this.typeGame = Setting.GameSetting.TYPEGAME;
    this.arenaWidth = Setting.ArenaSize.width;
    this.arenaLength = Setting.ArenaSize.height;
    this.arenaWidthPx = Setting.ArenaSize.widthPx;
    this.arenaLengthPx = Setting.ArenaSize.heightPx;
    this.watchKeysTheGame();
  }

  /**
   * Создать игровое поле
   */
   _createArena() {
    this.arena = new Arena(this);
  }

  /**
   * Создать фигуру
   */
   _createFigure() {
    this.figure = this.nextFigure || new Figure(this);
    this.nextFigure = new Figure(this);
  }

  /**
   * Отобразить игровое поле
   */
  _createView() {
    this.view = new View('.main', this.arena, this.arenaWidthPx, this.arenaLengthPx);
  }

  /**
   * Убрать игровое поле
   */
  _destroyView() {
    this.view.destroy('.main');
  }

  /**
   * Устанавливает слушателя кнопок
   */
  watchKeysTheGame() {
    document.addEventListener('keydown', (event) => {
      if (keyCode[event.code] === actionCode.PLAYPAUSE) {
        this.playPause();
      }
      if (this.process && Object.keys(keyCode).indexOf(event.code) != -1) {
        this.onMove(keyCode[event.code]);
      }
    });
  }

  /**
   * btn start
   * Старт игры
   */
  start() {
    this._createArena();
    this._createFigure();
    this._createView();
    this.score = 0;

    this.onMove(actionCode.CREATE);
    this._onProcess();
  }

  /**
   * btn pause
   * Пауза игры
   */
  playPause() {
    if (this.process) {
      this._stopProcess();
      this.view.textPause();
    } else {
      this._onProcess();
    }
  }

  /**
   * btn stop
   * Остановить игру
   */
  stop() {
    if (this.process) {
      this._stopProcess();
      this._destroyView();
    }
    this._stopProcess();
  }

  /**
   * Запустить процесс игры
   */
  _onProcess() {
    const speed = this._calcSpeed();
    this.process = setInterval(() => this.onMove(actionCode.DOWN, true), speed);
  }

  /**
   * Остановить процесс игры
   */
  _stopProcess() {
    !this.process || clearInterval(this.process);
    this.process = null;
  }

  /**
   * Выполнить перемещение фигуры
   * @param {actionCode} actionCodeName
   */
  _onMoveFigureToArena(actionCodeName) {
    this.figure.moveFigure(actionCodeName);
    this.arena.setFigureOnArena(this.figure);
    this.view.render();
  }

  /**
   * Расчёт скорости
   * @returns {number}
   */
  _calcSpeed() {
    return Setting.GameSetting.defaultSpeed / this.lavel;
  }

  _calcLavel() {
    return Math.floor((this.score || 1) / 10) + 1;
  }

  _isNextLavel() {
    if (this.lavel < this._calcLavel()) {
      this.lavel++;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Определяет действие на поле и выполняет его
   * @param {actionCode} actionCodeName - действие
   * @param {*} isTimeOut
   */
  onMove(actionCodeName, isTimeOut) {
    try {
      const testingFigure = this.figure.clone();
      testingFigure.moveFigure(actionCodeName);
      const isOutOfBeyonds = this.arena.isOutOfBeyonds(testingFigure);
      const isOutOfBeyondUp = this.arena.isOutOfBeyondUp(testingFigure);
      const isBusyTestingBlock = this.arena.isBusyField(testingFigure);
      const isBusyField = this.arena.isBusyField(this.figure);

      // console.log('fugure:', testingFigure);
      // console.log('за пределом поля:', isOutOfBeyonds);
      // console.log('за пределами с верху:', isOutOfBeyondUp);
      // console.log('Ячейка занята:', isBusyTestingBlock);
      // console.log('Ячейка занята:', isBusyField);

      if ((isBusyTestingBlock || (isOutOfBeyonds && !isOutOfBeyondUp)) && !isTimeOut) {
        // Ничего
      } else if ((isBusyTestingBlock || (isOutOfBeyonds && !isOutOfBeyondUp)) && isTimeOut) {
        this.arena.fixateFigureOnArena(this.figure);
        this.score += this.arena.destroyFullLine();
        this._createFigure();
        this.onMove(actionCode.CREATE);
      } else if (isBusyField && isOutOfBeyondUp) {
        this.stop();
      } else {
        this._onMoveFigureToArena(actionCodeName);
      }

      this.view.textScore(this.score);
      this.view.nextFigure(this.nextFigure);

      if (this._isNextLavel()) {
        this._stopProcess();
        this._onProcess();
        this.view.nextLavel(this.lavel);
      }
      this.view.textLavel(this.lavel);


    } catch (error) {
      console.error('Game.onMove', error, actionCodeName);
    }
  }
}

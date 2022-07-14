import * as Figures from '../../constants/figures.constant.js';
import * as utils from '../../utils/utils.js';
import { actionCode } from '../../constants/code.constant.js';

export class Figure {
  constructor(game) {
    this.arenaWidth = game.arenaWidth;
    this.typeGame = game.typeGame;
    this.name = '';
    this.x = (this.arenaWidth / 2) - 1;
    this.y = 0;
    this._arena = [];
    this._createFigure(this._randomFigureName());
  }

  /**
   * Вернёт поле с фигурой
   * @returns
   */
  getArenaFigures() {
    return this._arena;
  }

  /**
   * Вернёт произвольное имя для новой фигуры
   * @returns {String} Figures.ListNames
   */
  _randomFigureName() {
    const ListNames = Figures.ListNames[this.typeGame];
    return ListNames[utils.random(ListNames.length - 1)];
  }

  /**
   * Создаёт новую фигуру в произвольном положении
   * @param {string} Figures.ListNames
   */
  _createFigure(figureName) {
    this.name = figureName;
    this._arena = Figures[figureName].arena;
    for (let i = 0; i < utils.random(4); i++) {
      this.byClockWise();
    }
  }

  /**
   * Выполнить движениефигуры
   * @param {actionCode} actionCodeName
   */
  moveFigure(actionCodeName) {
    switch (actionCodeName) {
      case actionCode.CREATE: this.y -= this._arena.length; break;
      case actionCode.LEFT: this.x -= 1; break;
      case actionCode.RIGHT: this.x += 1; break;
      case actionCode.DOWN: this.y += 1; break;
      case actionCode.TURN: this.byClockWise(); break;
    }
  }

  /**
   * Повернуть по часовой стрелке
   */
  byClockWise() {
    const tempArena = [];
    [...this._arena].forEach((line) => {
      line.forEach((block, blockIndex) => {
        tempArena[blockIndex] ? tempArena[blockIndex].unshift(block) : tempArena.push([block]);
      });
    });

    this._arena = tempArena;
  }

  /**
   * Повернуть против часовой стрелке
   */
  counterClockWise() {
    const tempArena = [];
    [...this._arena].forEach((line) => {
      line.reverse().forEach((block, blockIndex) => {
        tempArena[blockIndex] ? tempArena[blockIndex].push(block) : tempArena.push([block]);
      });
    });

    this._arena = tempArena;
  }

  /**
   * Вернёт ширину поля фигуры
   * @returns {number}
   */
  getWigthArena() {
    return this._arena && this._arena[0] ? this._arena[0].length : 0;
  }

  /**
   * Вернёт высоту поля фигуры
   * @returns {number}
   */
  getLengthArena() {
    return this._arena ? this._arena.length : 0;
  }

  /**
   * Вернёт копию себя
   * @returns {Figure}
   */
  clone() {
    return utils.clone(this);
  }
}

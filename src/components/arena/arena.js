import * as Figures from '../../constants/figures.constant.js';

export class Arena {
  constructor(game) {
    this.fields = [];
    this.symbolInEmptyCell = 0;
    this.symbolInfilledCell = 1;
    this.width = game.width || 10;
    this.height = game.height || 20;
    this.typeGame = game.typeGame;
    this._createArena();
  }

  /**
   * Удалит старую фигуру и Отметит полученную фигуру на поле
   * @param {Figure} figure
   */
  setFigureOnArena(figure) {
    this.cleanFieldsArenaFromFigure();
    const arenaFigure = figure.getArenaFigures();
    [...arenaFigure].forEach((line, lineIndex) => [...line].forEach((block, blockIndex) => {
      if (figure.y + lineIndex >= 0 && block) this.fields[figure.y + lineIndex][figure.x + blockIndex] = figure.name;
    }));
  }

  /**
   * Удалит фигуру с поля
   */
  cleanFieldsArenaFromFigure() {
    this.fields.forEach((line, lineIndex) => line.forEach((block, blockIndex) => {
      if (Figures.ListNames[this.typeGame].indexOf(block) != -1) {
        this.fields[lineIndex][blockIndex] = 0;
      }
    }));
  }

  /**
   * Генерировать поле
   */
  _createArena() {
    const temp = [];
    for (let l = 0; l < this.height; l++) {
      temp.push(this._createArenaLine());
    }
    this.fields = temp;
  }

  /**
   * Создаст строку для поля нужной длинны
   * @returns {number[]} Вернёт массив заполненный symbolInEmptyCell
   */
  _createArenaLine() {
    return new Array(this.width).fill(this.symbolInEmptyCell);
  }

  /**
   * Убрать заполненные строки и создать новые
   * @returns {number} - количество убранных строк
   */
  destroyFullLine() {
    const indexesOfLineInFields = [];

    this.fields.forEach((line, lineIndex) => {
      if (line.every((block) => !!block)) {
        indexesOfLineInFields.push(lineIndex);
        this.fields.splice(lineIndex, 1);
        this.fields.unshift(this._createArenaLine());
      }
    });

    return indexesOfLineInFields.length;
  }

  /**
   * Зафиксировать фигуру на полеуказав в ячейке symbolInfilledCell
   * @param {Figure} figure
   */
  fixateFigureOnArena(figure) {
    const arenaFigure = figure.getArenaFigures();

    arenaFigure.forEach((line, lineIndex) => {
      line.forEach((block, blockIndex) => {
        if (block) this.fields[figure.y + lineIndex][figure.x + blockIndex] = this.symbolInfilledCell;
      });
    });
  }

  /**
   * Ячейка занята
   * @param {Figure} figure
   * @returns {Boolean}
   */
  isBusyField(figure) {
    const arenaFigure = figure.getArenaFigures();

    return [...arenaFigure].some((line, lineIndex) => [...line].some((block, blockIndex) => block
        && this.fields[figure.y + lineIndex]
        && this.fields[figure.y + lineIndex][figure.x + blockIndex]
        && this.fields[figure.y + lineIndex][figure.x + blockIndex] !== figure.name));
  }

  /**
   * Если за пределами с верху
   * @param {Figure} figure
   * @returns {Boolean}
   */
  isOutOfBeyondUp(figure) {
    return figure.y < 0;
  }

  /**
   * Находится за пределом поля по сторонам или с низу
   * @param {Figure} figure
   * @returns {Boolean}
   */
  isOutOfBeyonds(figure) {
    const lengthFigure = figure.getLengthArena();
    const wigthFigure = figure.getWigthArena();

    return (
      figure.y > 0
          && (this.fields[figure.y] === undefined || this.fields[figure.y][figure.x] === undefined)
    )
        || this.fields[figure.y + lengthFigure - 1] === undefined
        || this.fields[figure.y + lengthFigure - 1][figure.x + wigthFigure - 1] === undefined;
  }
}

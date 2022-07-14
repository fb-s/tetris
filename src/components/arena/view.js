import * as Figures from '../../constants/figures.constant.js';

export class View {

  constructor(nameMainBlock, arena, width, height) {
    const main = document.querySelector(nameMainBlock);
    this.arenaBackground = '#aaa';
    this.arenaFiguleColor = '#666';
    this.arena = arena;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.context = this.canvas.getContext('2d');

    main.appendChild(this.canvas);
  }

  getSizeFigure() {
    return this.canvas.height / this.arena.height;
  }

  render() {
    this.arena.fields.forEach((line, lineIndex) => {
      line.forEach((block, blockIndex) => {
        if (block) {
          this.context.fillStyle = Figures[block] ? Figures[block].color : this.arenaFiguleColor;
          this.context.strokeStyle = '#bbb';
          this.context.lineWidth = 2;
          this.context.fillRect(blockIndex * this.getSizeFigure(), lineIndex * this.getSizeFigure(), this.getSizeFigure(), this.getSizeFigure());
          this.context.strokeRect(blockIndex * this.getSizeFigure(), lineIndex * this.getSizeFigure(), this.getSizeFigure(), this.getSizeFigure());
        } else {
          this.context.fillStyle = this.arenaBackground;
          this.context.strokeStyle = '#bbb';
          this.context.lineWidth = 2;
          this.context.fillRect(blockIndex * this.getSizeFigure(), lineIndex * this.getSizeFigure(), this.getSizeFigure(), this.getSizeFigure());
        }
      });
    });
  }

  textPause() {
    this.context.font = '30px Comic Sans MS';
    this.context.fillStyle = 'red';
    this.context.textAlign = 'center';
    this.context.fillText('Pause', this.canvas.width / 2, this.canvas.height / 2);
  }

  textScore(score) {
    this.context.font = '16px Comic Sans MS';
    this.context.fillStyle = 'green';
    this.context.textAlign = 'right';
    this.context.fillText(score || 0, this.canvas.width - 20, 20);
  }

  nextLavel(lavel) {
    this.context.font = '30px Comic Sans MS';
    this.context.fillStyle = 'red';
    this.context.textAlign = 'center';
    this.context.fillText(`Lavel ${lavel || 0}`, this.canvas.width / 2, this.canvas.height / 2);
  }

  textLavel(lavel) {
    this.context.font = '16px Comic Sans MS';
    this.context.fillStyle = 'gray';
    this.context.textAlign = 'center';
    this.context.fillText(`Lavel ${lavel || 0}`, this.canvas.width / 2, 20);
  }

  nextFigure(figure) {
    this.context.font = '16px Comic Sans MS';
    this.context.fillStyle = figure.color;
    this.context.textAlign = 'left';
    this.context.fillText(figure.name || 0, 20, 20);
  }

  destroy(nameMainBlock) {
    const main = document.querySelector(nameMainBlock);
    main.innerHTML = '';
  }
}

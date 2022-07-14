import { BodyGame } from './components/body/body.js';
import { Game } from './components/game/game.js';

const bodyGame = new BodyGame();
const game = new Game();

function changeColor() {
  bodyGame.changeColor();
}

function start() {
  bodyGame.start();
  game.start();
}

function play() {
  bodyGame.resume();
  game.playPause();
}

function pause() {
  bodyGame.pause();
  game.playPause();
}

function stop() {
  bodyGame.stop();
  game.stop();
}

window.start = start;
window.play = play;
window.pause = pause;
window.stop = stop;
window.changeColor = changeColor;

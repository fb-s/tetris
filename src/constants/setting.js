import { typeGame } from './code.constant.js';

/**
 * Размеры поля по-умолчанию
 */
export const ArenaSize = {
  width: 10,
  height: 20,
  widthPx: 320,
  heightPx: 640,
};

export const GameSetting = {
  SCOPE: 0,
  LEVEL: 1,
  TYPEGAME: typeGame.LIGHT,
  defaultSpeed: 1000,
};

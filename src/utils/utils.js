/**
 * Вернёт независимую копию объекта
 * @function
 * @description
 * @param {object} objForClone
 * @returns {object}
 */
export function clone(objForClone) {
  return Object.assign(
    Object.create(
      Object.getPrototypeOf(objForClone),
    ),
    JSON.parse(JSON.stringify(objForClone)),
  );
}

/**
 * Вернёт произвольное положительное число | 0
 * @param {number} maxNumber
 * @returns {number}
 */
export function random(maxNumber = 1) {
  return Math.floor(Math.random() * maxNumber);
}

/**
 * Generate random int number with a specific range
 * @param {number} from
 * @param {number} to
 * @returns {number}
 */
export default function randomInt(from = 0, to = 100) {
  const min = Math.ceil(from);
  const max = Math.floor(to);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

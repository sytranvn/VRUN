/**
 * Shuffle random array
 * @param {array} arr
 * @returns {array}
 */
export default function shuffle(arr) {
  return Array.isArray(arr) ? arr.sort(() => Math.random() - 0.5) : arr;
}

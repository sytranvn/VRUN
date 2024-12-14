/**
 * Count total words in a string
 * @param {string} txt
 * @returns {number}
 */
export default function countWords(txt) {
  return txt.split(/[\n\r]/g).join(' ').split(/[\s]/g).filter(Boolean).length;
}

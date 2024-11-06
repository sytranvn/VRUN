/**
 * enableBodyScroll
 * @param {HTMLElement} target
 */
export default function enableBodyScroll(target) {
  if (target instanceof HTMLElement) {
    target.style.overflowX = null;
    target.style.overflowY = null;
  }
}

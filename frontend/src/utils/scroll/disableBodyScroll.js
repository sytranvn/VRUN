/**
 * disableBodyScroll
 * @param {HTMLElement} target
 */
export default function disableBodyScroll(target) {
  if (target instanceof HTMLElement) {
    target.style.overflowX = 'hidden';
    target.style.overflowY = 'hidden';
  }
}

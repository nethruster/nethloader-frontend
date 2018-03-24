/**
 * This script provides an interface to block and unblock document scrolling.
 */

export function scrollBlockOn () {
  let body = document.documentElement
  // Detect if we are in a touchscreen device
  if ('ontouchstart' in document.documentElement) {
    body.style.overflow = 'hidden'
  } else if (_hasScrollbar()) {
    body.style.overflow = 'hidden'
    body.style.paddingRight = '17px'
  }
}

export function scrollBlockOff () {
  document.documentElement.removeAttribute('style')
}

/* Huge thanks to Tyler Cipriani
 * https://tylercipriani.com/blog/2014/07/12/crossbrowser-javascript-scrollbar-detection/
 */
const _hasScrollbar = function () {
  // The Modern solution
  if (typeof window.innerWidth === 'number') { return window.innerWidth > document.documentElement.clientWidth }

  // rootElem for quirksmode
  let rootElem = document.documentElement || document.body

  // Check overflow style property on body for fauxscrollbars
  let overflowStyle

  if (typeof rootElem.currentStyle !== 'undefined') { overflowStyle = rootElem.currentStyle.overflow }

  overflowStyle = overflowStyle || window.getComputedStyle(rootElem, '').overflow

  // Also need to check the Y axis overflow
  let overflowYStyle

  if (typeof rootElem.currentStyle !== 'undefined') { overflowYStyle = rootElem.currentStyle.overflowY }

  overflowYStyle = overflowYStyle || window.getComputedStyle(rootElem, '').overflowY

  let contentOverflows = rootElem.scrollHeight > rootElem.clientHeight
  let overflowShown = /^(visible|auto)$/.test(overflowStyle) || /^(visible|auto)$/.test(overflowYStyle)
  let alwaysShowScroll = overflowStyle === 'scroll' || overflowYStyle === 'scroll' || overflowStyle === 'auto' || overflowYStyle === 'auto'

  return (contentOverflows && overflowShown) || (alwaysShowScroll)
}

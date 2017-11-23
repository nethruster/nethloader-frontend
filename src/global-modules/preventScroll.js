/**
 * This script provides an interface to block and unblock document scrolling, including keypresses and touch events.
 */

/* List of keys that can cause scrolling
 *
 * spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
 * left: 37, up: 38, right: 39, down: 40,
 */
const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40]
let pageXOffset,
  pageYOffset

export function scrollBlockOn () {
  // Save current scroll position so we can lock it later
  pageXOffset = window.pageXOffset
  pageYOffset = window.pageYOffset

  document.addEventListener('scroll', _scrollHandler)
  document.addEventListener('wheel', _defaultHandler)
  document.addEventListener('DOMMouseScroll', _defaultHandler)
  document.addEventListener('touchmove', _defaultHandler)
  document.addEventListener('keydown', _keydownHandler)
}

export function scrollBlockOff () {
  document.removeEventListener('scroll', _scrollHandler)
  document.removeEventListener('wheel', _defaultHandler)
  document.removeEventListener('DOMMouseScroll', _defaultHandler)
  document.removeEventListener('touchmove', _defaultHandler)
  document.removeEventListener('keydown', _keydownHandler)
}

function _defaultHandler (event) {
  event.preventDefault()
}

function _keydownHandler (event) {
  if (scrollKeys.includes(event.keyCode)) {
    event.preventDefault()
  }
}

function _scrollHandler (event) {
  event.preventDefault()
  window.scrollTo(pageXOffset, pageYOffset)
}

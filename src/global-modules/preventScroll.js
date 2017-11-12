/* List of keys that can cause scrolling
 *
 * spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
 * left: 37, up: 38, right: 39, down: 40,
 */
const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40]
let pageXOffset,
  pageYOffset

export function scrollOn () {
  // Save current scroll position so we can lock it later
  pageXOffset = window.pageXOffset
  pageYOffset = window.pageYOffset

  document.addEventListener('scroll', scrollHandler)
  document.addEventListener('wheel', defaultHandler)
  document.addEventListener('DOMMouseScroll', defaultHandler)
  document.addEventListener('touchmove', defaultHandler)
  document.addEventListener('keydown', keydownHandler)
}

export function scrollOff () {
  document.removeEventListener('scroll', scrollHandler)
  document.removeEventListener('wheel', defaultHandler)
  document.removeEventListener('DOMMouseScroll', defaultHandler)
  document.removeEventListener('touchmove', defaultHandler)
  document.removeEventListener('keydown', keydownHandler)
}

function defaultHandler (event) {
  event.preventDefault()
}

function keydownHandler (event) {
  if (scrollKeys.includes(event.keyCode)) {
    event.preventDefault()
  }
}

function scrollHandler (event) {
  event.preventDefault()
  window.scrollTo(pageXOffset, pageYOffset)
}

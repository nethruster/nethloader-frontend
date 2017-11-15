/* Thanks to http://codepen.io/jh3y/pen/EKGXEY
 * under the MIT LICENSE
 */

// TODO: Fix duplicated ripples on reload or replace plugin for something else

const mdripple = (element) => {
  let cleanUp, debounce, rippleContainer, showRipple

  debounce = (func, delay) => {
    return () => {
      let context = this

      return setTimeout(() => {
        return func.apply(context)
      }, delay)
    }
  }

  showRipple = (event) => {
    let pos, rippler, size, style, x, y
    rippler = document.createElement('span')
    size = element.offsetWidth
    pos = element.getBoundingClientRect()
    x = event.pageX - pos.left - (size / 2)
    y = event.pageY - pos.top - (size / 2)
    style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;'
    element.rippleContainer.appendChild(rippler)
    return rippler.setAttribute('style', style)
  }

  cleanUp = () => {
    while (rippleContainer.firstChild) {
      rippleContainer.removeChild(rippleContainer.firstChild)
    }
  }

  rippleContainer = document.createElement('div')
  rippleContainer.className = 'ripple--container'

  element.addEventListener('mousedown', showRipple)
  element.addEventListener('mouseup', debounce(cleanUp, 2000))
  element.rippleContainer = rippleContainer
  element.appendChild(rippleContainer)
}

export default mdripple

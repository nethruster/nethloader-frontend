/* Thanks to http://codepen.io/jh3y/pen/EKGXEY
 * under the MIT LICENSE
 */

let mdripple = function (element) {
  let cleanUp, debounce, rippleContainer, showRipple

  debounce = function (func, delay) {
    let inDebounce
    inDebounce = undefined
    return function () {
      let args, context
      context = this
      args = arguments
      clearTimeout(inDebounce)
      return inDebounce = setTimeout(function () {
        return func.apply(context, args)
      }, delay)
    }
  }

  showRipple = function (e) {
    let pos, rippler, size, style, x, y
    rippler = document.createElement('span')
    size = element.offsetWidth
    pos = element.getBoundingClientRect()
    x = e.pageX - pos.left - (size / 2)
    y = e.pageY - pos.top - (size / 2)
    style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;'
    element.rippleContainer.appendChild(rippler)
    return rippler.setAttribute('style', style)
  }

  cleanUp = function () {
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

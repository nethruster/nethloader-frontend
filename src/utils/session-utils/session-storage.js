'use-strict'

import jwtDecode from 'jwt-decode'

const getSessionData = function () {
  return JSON.parse(window.sessionStorage.getItem('sessionData'))
}

const getCurrentSessionToken = function () {
  return window.sessionStorage.getItem('jwtToken') || ''
}

const updateSessionStorage = function (token) {
  let sessionData = jwtDecode(token)
  if (!getCurrentSessionToken()) {
    window.sessionStorage.setItem('jwtToken', token)
  }
  window.sessionStorage.setItem('sessionData', JSON.stringify(sessionData))
}

const checkSessionState = function () {
  let currentSessionToken = getCurrentSessionToken()
  if (currentSessionToken) {
    updateSessionStorage(currentSessionToken)
    let sessionExpires = getSessionData().exp
    if (Math.floor((new Date()).getTime() / 1000) < sessionExpires) {
      return true
    }
  } else {
    console.warn('login-manager/checkSessionState: Couldn\'t find session')
  }

  return false
}

export {
  checkSessionState,
  getSessionData,
  updateSessionStorage,
  getCurrentSessionToken
}

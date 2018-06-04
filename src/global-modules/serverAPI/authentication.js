import jwtDecode from 'jwt-decode'

import { getStorageParams } from 'serverAPI/data'
import {
  requestLogin, receiveLogin, requestLoginData,
  requestLogout, receiveLogout
} from 'actions/authentication'

// Login
const loginUser = (credentials, maintainSession, history, loginFormElement, wasLogged) => {
  return async dispatch => {
    const login = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdvS0xieWN1U1QiLCJzZXNzaW9uU2lnbmF0dXJlIjoicE1aNWx4b2kzckU1d2pkTjh6aWdpSFB6IiwiaWF0IjoxNTIzNDQ1NzI5LCJleHAiOjE1MjM1MzIxMjl9.Y9lbLB6aOrvMEBbXyjJkWVo5-I2lKU35_Y0_vAZGwhM'
    let decodedData = jwtDecode(login)

    if (wasLogged) {
      dispatch(requestLoginData())
    } else {
      dispatch(requestLogin())
    }

    if (!wasLogged) {
    // Get storage data
      getStorageParams()
    }

    window.localStorage.setItem('neth-jwtToken', login)
    window.localStorage.setItem('neth-sessionData', JSON.stringify(decodedData))
    if (window.localStorage.getItem('nth-theme') === null) {
      window.localStorage.setItem('nth-theme', 'light')
    }

    dispatch(receiveLogin(login, decodedData))

    if (loginFormElement) {
      loginFormElement.reset()
    }

    if (history) {
      history.push('/cp')
    }
  }
}

// Register
const registerUser = (data, history, registerFormElement) => {

}

// Logout
const logoutUser = () => {
  return async dispatch => {
    dispatch(requestLogout())

    Object.keys(window.localStorage).forEach((value) => {
      if (value.substring(0, 4) === 'neth') {
        window.localStorage.removeItem(value)
      }
    })

    Object.keys(window.sessionStorage).forEach((value) => {
      if (value.substring(0, 4) === 'neth') {
        window.sessionStorage.removeItem(value)
      }
    })

    dispatch(receiveLogout())
  }
}

const checkCurrentSessionToken = async (token) => {
  return {
    'data': { 'IsCurrentSessionValid': true }
  }
}

export {
  loginUser,
  registerUser,
  logoutUser,
  checkCurrentSessionToken
}

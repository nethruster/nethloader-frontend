import jwtDecode from 'jwt-decode'

import { getStorageParams } from 'serverAPI/data'
import {
  requestLogin, receiveLogin, loginError,
  requestRegister, receiveRegister, registerError,
  requestLogout, receiveLogout
} from 'actions/authentication'

// Login
const loginUser = (credentials, maintainSession, history, loginFormElement) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation{ login(email: "${credentials.email}", password: "${credentials.password}", preventSessionExpire: ${maintainSession}) }`
    })
  }

  return async dispatch => {
    dispatch(requestLogin())

    let serverResponse = await fetch(apiBaseUrl, requestConfig) // eslint-disable-line no-undef

    let responseData = await serverResponse.json()
    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      if (responseData.data.login) {
        // If login was successful, set the token in local storage
        let decodedData = jwtDecode(responseData.data.login)

        window.localStorage.setItem('neth-jwtToken', responseData.data.login)
        window.localStorage.setItem('neth-sessionData', JSON.stringify(decodedData))
        if (window.localStorage.getItem('nth-theme') === null) {
          window.localStorage.setItem('nth-theme', 'light')
        }

        // Get storage data
        getStorageParams(responseData.data.login)

        // Dispatch the success action
        dispatch(receiveLogin(responseData.data.login, decodedData))
        loginFormElement.reset()
        history.push('/cp')
      } else {
        console.log('loginUser - responseData: ', responseData)
        dispatch(loginError(responseData.errors[0].message))
        return Promise.reject(responseData.errors[0].message)
      }
    } else {
      console.log('loginUser - serverResponse: ', responseData.errors[0].message)
      dispatch(loginError(responseData.errors[0].message))
      return Promise.reject(responseData.errors[0].message)
    }
  }
}

// Register
const registerUser = (data, history, registerFormElement) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation{ register(name: "${data.username}", email: "${data.email}", password: "${data.password}") }`
    })
  }

  return async dispatch => {
    dispatch(requestRegister())

    let serverResponse = await fetch(apiBaseUrl, requestConfig) // eslint-disable-line no-undef
    let responseData = await serverResponse.json()
    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      if (responseData.data.register) {
        let decodedData = jwtDecode(responseData.data.register)

        // If register was successful, set the token in local storage
        window.localStorage.setItem('neth-jwtToken', responseData.data.register)
        window.localStorage.setItem('neth-sessionData', JSON.stringify(decodedData))
        if (window.localStorage.getItem('nth-theme') === null) {
          window.localStorage.setItem('nth-theme', 'light')
        }

        // Get storage data
        getStorageParams(responseData.data.register)

        // Dispatch the success action
        dispatch(receiveRegister(responseData.data.register, decodedData))

        registerFormElement.reset()
        history.push('/cp')
      } else {
        console.log('registerUser - responseData: ', responseData)
        dispatch(registerError(responseData.errors[0].message))
        return Promise.reject(responseData.errors[0].message)
      }
    } else {
      console.log('registerUser - serverResponse: ', responseData.errors[0])
      dispatch(loginError(responseData.errors[0].message))
      return Promise.reject(responseData.errors[0].message)
    }
  }
}

// Logout
const logoutUser = () => {
  return dispatch => {
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
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': token
    },
    body: JSON.stringify({
      query: `query{IsCurrentSessionValid}`
    })
  }

  let serverResponse = await fetch(apiBaseUrl, requestConfig) // eslint-disable-line no-undef

  if (serverResponse.status >= 200 && serverResponse.status < 300) {
    let responseData = await serverResponse.json()

    return responseData.data.IsCurrentSessionValid
  }

  console.log('checkCurrentSessionToken: ', serverResponse)
  return Promise.reject(serverResponse.status)
}

export {
  loginUser,
  registerUser,
  logoutUser,
  checkCurrentSessionToken
}

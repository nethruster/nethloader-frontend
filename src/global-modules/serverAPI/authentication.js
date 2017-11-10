import { apiBaseUrl } from 'app.config'
import jwtDecode from 'jwt-decode'

import {
  requestLogin, receiveLogin, loginError,
  requestRegister, receiveRegister, registerError,
  requestLogout, receiveLogout } from 'actions/authentication'

// Login
const loginUser = (credentials, history, loginFormElement) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'},
    body: JSON.stringify({
      query: `mutation{ login(email: "${credentials.email}", password: "${credentials.password}") }`
    })
  }

  return async dispatch => {
    dispatch(requestLogin())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.login) {
        // If login was successful, set the token in local storage
        let decodedData = jwtDecode(responseData.data.login)

        window.localStorage.setItem('neth-jwtToken', responseData.data.login)
        window.localStorage.setItem('neth-sessionData', JSON.stringify(decodedData))
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
      console.log('loginUser - serverResponse: ', serverResponse)
      dispatch(loginError(serverResponse.status))
      return Promise.reject(serverResponse.status)
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

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.register) {
        let decodedData = jwtDecode(responseData.data.register)

        // If register was successful, set the token in local storage
        window.localStorage.setItem('neth-jwtToken', responseData.data.register)
        window.localStorage.setItem('neth-sessionData', JSON.stringify(decodedData))

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
      console.log('registerUser - serverResponse: ', serverResponse)
      dispatch(registerError(serverResponse.status))
      return Promise.reject(serverResponse.status)
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

  let serverResponse = await fetch(apiBaseUrl, requestConfig)

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

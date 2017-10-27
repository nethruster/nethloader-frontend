'use strict'
import jwtDecode from 'jwt-decode'

import { apiBaseUrl } from 'app.config'
import {
  requestLogin, receiveLogin, loginError,
  requestLogout, receiveLogout,
  requestRegister, receiveRegister, registerError } from 'actions'

// Login
const loginUser = (credentials, history) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'},
    body: JSON.stringify({
      query: `mutation{ login(email: "${credentials.email}", password: "${credentials.password}") }`
    })
  }

  return dispatch => {
    dispatch(requestLogin())

    return fetch(apiBaseUrl, requestConfig)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            dispatch(loginError(response.status))
            return Promise.reject(response.status)
          }
        })
        .then(result => {
          if (!result.data.login) {
            dispatch(loginError(result.errors[0].message))
            return Promise.reject(result.errors[0].message)
          } else {
            // If login was successful, set the token in local storage
            window.localStorage.setItem('jwtToken', result.data.login)
            window.localStorage.setItem('sessionData', JSON.stringify(jwtDecode(result.data.login)))
            // Dispatch the success action
            dispatch(receiveLogin())
            history.push('/cp')
          }
        }).catch(err => console.log(err))
  }
}

// Logout
const logoutUser = (history) => {
  return dispatch => {
    dispatch(requestLogout())
    window.localStorage.removeItem('jwtToken')
    window.localStorage.removeItem('sessionData')
    dispatch(receiveLogout())
    history.push('/login')
  }
}

// Register
const registerUser = (data, history) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'},
    body: JSON.stringify({
      query: `mutation{ register(name: "${data.username}", email: "${data.email}", password: "${data.password}") }`
    })
  }

  return dispatch => {
    dispatch(requestRegister())

    return fetch(apiBaseUrl, requestConfig)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            dispatch(registerError(response.status))
            return Promise.reject(response.status)
          }
        })
        .then(result => {
          if (!result.data.register) {
            dispatch(registerError(result.errors[0].message))
            return Promise.reject(result.errors[0].message)
          } else {
            // If regiister was successful, set the token in local storage
            window.localStorage.setItem('jwtToken', result.data.register)
            window.localStorage.setItem('sessionData', JSON.stringify(jwtDecode(result.data.register)))
            // Dispatch the success action
            dispatch(receiveRegister())
            history.push('/cp')
          }
          console.log(result)
        }).catch(err => console.log(err))
  }
}

export {
  loginUser,
  logoutUser,
  registerUser
}

'use strict'

import { apiBaseUrl } from 'app.config'
import jwtDecode from 'jwt-decode'

import {
  requestLogin, receiveLogin, loginError,
  requestLogout, receiveLogout } from 'actions/authentication'

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
            let decodedData = jwtDecode(result.data.login)

            window.localStorage.setItem('neth-jwtToken', result.data.login)
            window.localStorage.setItem('neth-sessionData', JSON.stringify(decodedData))
            // Dispatch the success action
            dispatch(receiveLogin(result.data.login, decodedData))

            history.push('/cp')
          }
        }).catch(err => console.log(err))
  }
}

// Logout
const logoutUser = (history) => {
  return dispatch => {
    dispatch(requestLogout())

    Object.keys(window.localStorage).forEach((value) => {
      if (value.substring(0, 4) === 'neth') {
        window.localStorage.removeItem(value)
      }
    })

    dispatch(receiveLogout())
    history.push('/login')
  }
}

const logoutUserNoHistory = () => {
  return dispatch => {
    dispatch(requestLogout())

    Object.keys(window.localStorage).forEach((value) => {
      if (value.substring(0, 4) === 'neth') {
        window.localStorage.removeItem(value)
      }
    })

    dispatch(receiveLogout())
    window.location.reload()
  }
}

export {
  loginUser,
  logoutUser,
  logoutUserNoHistory
}

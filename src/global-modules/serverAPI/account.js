'use strict'

import { apiBaseUrl } from 'app.config'
import jwtDecode from 'jwt-decode'

import { requestRegister, receiveRegister, registerError } from 'actions/account'
import { getUserData } from './data'

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
            let decodedData = jwtDecode(result.data.register)

            // If register was successful, set the token in local storage
            window.localStorage.setItem('neth-jwtToken', result.data.register)
            window.localStorage.setItem('neth-sessionData', JSON.stringify(decodedData))
            // Dispatch the success action
            dispatch(receiveRegister())

            history.push('/cp')
          }
        }).catch(err => console.log(err))
  }
}

export {
  registerUser
}

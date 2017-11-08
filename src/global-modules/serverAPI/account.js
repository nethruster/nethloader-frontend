'use strict'

import { apiBaseUrl } from 'app.config'
import jwtDecode from 'jwt-decode'

import { requestRegister, receiveRegister, registerError } from 'actions/account'

// Register
const registerUser = (data, history, registerFormElement) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'},
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
        dispatch(receiveRegister())

        registerFormElement.reset()
        history.push('/login')
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

export {
  registerUser
}

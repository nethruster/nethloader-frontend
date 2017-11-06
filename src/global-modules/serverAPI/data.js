'use strict'

import { apiBaseUrl } from 'app.config'

import { requestUserData, receiveUserData, userDataError } from 'actions/data'

// User data
const getUserData = (id, authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `query{ user(id: "${id}") { name, email, apiKey, isAdmin, images { id, extension, createdAt }}}`
    })
  }

  return async dispatch => {
    dispatch(requestUserData())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.user) {
        // TODO Check if we already have the latest data
        // Set the data in local storage
        window.localStorage.setItem('neth-userData', JSON.stringify(responseData.data.user))
        // Dispatch the success action
        dispatch(receiveUserData(responseData.data.user))
      } else {
        console.log('getUserData - responseData: ' + responseData)
        dispatch(userDataError(responseData.errors[0].message))
        return Promise.reject(responseData.errors[0].message)
      }
    } else {
      console.log('getUserData - serverResponse: ' + serverResponse)
      dispatch(userDataError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}
export {
  getUserData
}
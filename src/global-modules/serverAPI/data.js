'use strict'

import { apiBaseUrl } from 'app.config'

import { requestUserData, receiveUserData, userDataError } from 'actions/data'

// Login
const getUserData = (id, authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `query{ user(id: "${id}") { id, name, email, apiKey, isAdmin, images { id, extension, createdAt }}}`
    })
  }

  return dispatch => {
    dispatch(requestUserData())

    return fetch(apiBaseUrl, requestConfig)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            dispatch(userDataError(response.status))
            return Promise.reject(response.status)
          }
        })
        .then(result => {
          if (!result.data.user) {
            console.log(result)
            dispatch(userDataError(result))
            return Promise.reject(result)
          } else {
            // If login was successful, set the token in local storage
            window.localStorage.setItem('neth-userData', JSON.stringify(result.data.user))
            // Dispatch the success action
            dispatch(receiveUserData(result.data.user))
          }
        }).catch(err => console.log(err))
  }
}

export {
  getUserData
}

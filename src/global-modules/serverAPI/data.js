import {apiBaseUrl} from 'app.config'

import {requestUserData, receiveUserData, userDataError,
  requestUserMedia, receiveUserMedia, userMediaError} from 'actions/data'

import {filterExtensions} from 'utils'

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
      query: `query{ user(id: "${id}") {name, email, apiKey, isAdmin}}`
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
        window.sessionStorage.setItem('neth-userData', JSON.stringify(responseData.data.user))
        // Dispatch the success action
        dispatch(receiveUserData(responseData.data.user))
      } else {
        console.log('getUserData - responseData: ', responseData)
        dispatch(userDataError(responseData.errors[0].message))
        return Promise.reject(responseData.errors[0].message)
      }
    } else {
      console.log('getUserData - serverResponse: ', serverResponse)
      dispatch(userDataError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}

// User media
const getUserMedia = (id, authToken, params) => {
  let extensionsFilter = params.type ? `extensions: [${filterExtensions[params.type]}],` : ''

  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },

    body: JSON.stringify({
      query: `query{ images(userId: "${id}", ${extensionsFilter} limit: ${params.mediaLimit || 10}, offset: ${params.offset || 0}, orderBy: "createdAt", orderDirection: "DESC", beforeDate: "${params.beforeDate || ''}", afterDate: "${params.afterDate || ''}"){totalCount, images {id, createdAt, extension}}}`
    })
  }

  return async dispatch => {
    dispatch(requestUserMedia(params))

    let totalCount = await getUserMediaCount(id, authToken)

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()
      if (responseData.data.images) {
        // TODO Check if we already have the latest data
        // Set the data in local storage
        window.localStorage.setItem('neth-userMedia', JSON.stringify(responseData.data.images))
        // Dispatch the success action
        dispatch(receiveUserMedia(responseData.data.images, totalCount))
      } else {
        console.log('getUserMedia - responseData: ', responseData)
        dispatch(userMediaError(responseData.errors[0].message))
        return Promise.reject(responseData.errors[0].message)
      }
    } else {
      console.log('getUserMedia - serverResponse: ', serverResponse)
      dispatch(userMediaError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}

// Get total count of user images
const getUserMediaCount = async (id, authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `query{ countImages(userId: "${id}")}`
    })
  }

  let serverResponse = await fetch(apiBaseUrl, requestConfig)

  if (serverResponse.status >= 200 && serverResponse.status < 300) {
    let responseData = await serverResponse.json()

    if (!isNaN(responseData.data.countImages) && responseData.data.countImages >= 0) {
      // Set the data in local storage
      window.localStorage.setItem('neth-totalCount', JSON.stringify(responseData.data.countImages))

      return JSON.stringify(responseData.data.countImages)
    }
    console.log('getUserMediaCount - responseData: ', responseData)
    return Promise.reject(responseData.errors[0].message)
  }
  console.log('getUserMediaCount - serverResponse: ', serverResponse)
  return Promise.reject(serverResponse.status)
}

const getStorageParams = async (authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `query{unprocessableExtensions,
                supportedVideoExtensions,
                supportedImageExtensions}`
    })
  }

  let serverResponse = await fetch(apiBaseUrl, requestConfig)

  if (serverResponse.status >= 200 && serverResponse.status < 300) {
    let responseData = await serverResponse.json()
    if (responseData.data) {
      // Set the data in local storage
      window.localStorage.setItem('neth-strData', JSON.stringify(responseData.data))

      return JSON.stringify(responseData.data)
    }
    console.log('getStorageParams - responseData: ', responseData)
    return Promise.reject(responseData.errors[0].message)
  }
  console.log('getStorageParams - serverResponse: ', serverResponse)
  return Promise.reject(serverResponse.status)
}

export {
  getUserData,
  getUserMedia,
  getUserMediaCount,
  getStorageParams
}

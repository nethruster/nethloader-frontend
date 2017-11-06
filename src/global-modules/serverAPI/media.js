'use strict'

import { apiBaseUrl } from 'app.config'

import { requestMediaUpload, receiveMediaUpload, mediaUploadError,
  requestMediaDelete, receiveMediaDelete, mediaDeleteError,
  requestMediaInfo, mediaInfoError, receiveMediaInfo } from 'actions/media'

import { getUserData } from 'serverAPI/data'

// Upload
const uploadMedia = (id, media, authToken) => {
  let formData = new FormData()

  formData.append('files', media, media.name)
  formData.append('query', `mutation{uploadImage{id, extension, createdAt}}`)

  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'authentication': authToken
    },
    body: formData
  }

  return async dispatch => {
    dispatch(requestMediaUpload())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.uploadImage) {
        // Dispatch the success action
        dispatch(receiveMediaUpload(responseData.data.uploadImage))
        // Refetch user data
        dispatch(getUserData(id, authToken))

        return responseData.data.uploadImage.id
      } else {
        console.log('uploadMedia - responseData: ' + responseData)
        dispatch(mediaUploadError(responseData))
        return Promise.reject(responseData)
      }
    } else {
      console.log('uploadMedia - serverResponse: ' + serverResponse)
      dispatch(mediaUploadError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}

// Delete
const deleteMedia = (mediaId, authToken, userId) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `mutation{ deleteImage(id: "${mediaId}")}`
    })
  }

  return async dispatch => {
    dispatch(requestMediaDelete())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)
    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.deleteImage) {
        // Dispatch the success action
        dispatch(receiveMediaDelete())

        // Refresh user data
        dispatch(getUserData(userId, authToken))
      } else {
        console.log('deleteMedia - responseData:' + responseData)
        dispatch(mediaDeleteError(responseData))
        return Promise.reject(responseData)
      }
    } else {
      console.log('deleteMedia - serverResponse:' + serverResponse)
      dispatch(mediaDeleteError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}

const getMediaInfo = (mediaId) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `query{ image(id: "${mediaId}") { id, extension, createdAt } }`
    })
  }

  return async dispatch => {
    dispatch(requestMediaInfo())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.image) {
        // Dispatch the success action
        dispatch(receiveMediaInfo(responseData.data.image))
      } else {
        console.log('getMediaInfo - responseData: ' + responseData)
        dispatch(mediaInfoError(responseData.errors[0].message))
        return Promise.reject(responseData.errors[0].message)
      }
    } else {
      console.log('getMediaInfo - serverResponse: ' + serverResponse)
      dispatch(mediaInfoError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}

export {
  uploadMedia,
  getMediaInfo,
  deleteMedia
}

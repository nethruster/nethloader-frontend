'use strict'

import { apiBaseUrl } from 'app.config'

import { requestMediaUpload, receiveMediaUpload, mediaUploadError,
  requestMediaInfo, mediaInfoError, receiveMediaInfo } from 'actions/media'
import {getUserData} from 'serverAPI/data'

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

  return dispatch => {
    dispatch(requestMediaUpload())

    return fetch(apiBaseUrl, requestConfig)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            dispatch(mediaUploadError(response.status))
            return Promise.reject(response.status)
          }
        })
        .then(async (result) => {
          if (!result.data.uploadImage) {
            dispatch(mediaUploadError(result))
            return Promise.reject(result)
          } else {
            // Dispatch the success action
            dispatch(receiveMediaUpload(result.data.uploadImage))
            dispatch(getUserData(id, authToken))
            return result.data.uploadImage.id
          }
        }).catch(err => console.log('uploadMedia: ' + err))
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

  return dispatch => {
    dispatch(requestMediaInfo())

    return fetch(apiBaseUrl, requestConfig)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            dispatch(mediaInfoError(response.status))
            return Promise.reject(response.status)
          }
        })
        .then(result => {
          if (!result.data.image) {
            dispatch(mediaInfoError(result.errors[0].message))
            return Promise.reject(result.errors[0].message)
          } else {
            // Dispatch the success action
            dispatch(receiveMediaInfo(result.data.image))
          }
        }).catch(err => console.log('getMediaInfo:' + err))
  }
}

export {
  uploadMedia,
  getMediaInfo
}

'use strict'

import { apiBaseUrl } from 'app.config'

import { requestMedaUpload, receiveMediaUpload, mediaUploadError } from 'actions/media'
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
    dispatch(requestMedaUpload())

    return fetch(apiBaseUrl, requestConfig)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json()
          } else {
            dispatch(mediaUploadError(response.status))
            return Promise.reject(response.status)
          }
        })
        .then(result => {
          if (!result.data.uploadImage) {
            dispatch(mediaUploadError(result))
            return Promise.reject(result)
          } else {
            // Dispatch the success action
            dispatch(receiveMediaUpload(result.data.uploadImage))
            dispatch(getUserData(id, authToken))
            return result.data.uploadImage.id
          }
        }).catch(err => console.log(err))
  }
}

export {
  uploadMedia
}

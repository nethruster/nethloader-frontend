import appConstants from '../constants'

const requestMediaUpload = () => {
  return {
    type: appConstants.MEDIA_UPLOAD_REQUEST,
    data: {}
  }
}

const receiveMediaUpload = (data) => {
  return {
    type: appConstants.MEDIA_UPLOAD_SUCCESS,
    data
  }
}

const mediaUploadError = (errorMessage) => {
  return {
    type: appConstants.MEDIA_UPLOAD_FAILURE,
    errorMessage
  }
}

const requestMediaInfo = () => {
  return {
    type: appConstants.MEDIA_INFO_REQUEST,
    isFetching: true,
    mediaInfo: {}
  }
}

const receiveMediaInfo = (mediaInfo) => {
  return {
    type: appConstants.MEDIA_INFO_SUCCESS,
    isFetching: false,
    mediaInfo
  }
}

const mediaInfoError = (errorMessage) => {
  return {
    type: appConstants.MEDIA_INFO_FAILURE,
    isFetching: false,
    mediaInfo: {},
    errorMessage
  }
}

export {
  requestMediaUpload,
  receiveMediaUpload,
  mediaUploadError,
  requestMediaInfo,
  receiveMediaInfo,
  mediaInfoError
}

import appConstants from '../constants'

const requestMedaUpload = () => {
  return {
    type: appConstants.MEDIA_UPLOAD_REQUEST,
    isUploading: true,
    data: {}
  }
}

const receiveMediaUpload = (data) => {
  return {
    type: appConstants.MEDIA_UPLOAD_SUCCESS,
    isUploading: false,
    data
  }
}

const mediaUploadError = (errorMessage) => {
  return {
    type: appConstants.MEDIA_UPLOAD_FAILURE,
    isUploading: false,
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
  requestMedaUpload,
  receiveMediaUpload,
  mediaUploadError,
  requestMediaInfo,
  receiveMediaInfo,
  mediaInfoError
}

import appConstants from '../constants'

const requestMediaUpload = () => {
  return {
    type: appConstants.MEDIA_UPLOAD_REQUEST,
    mediaData: {}
  }
}

const receiveMediaUpload = (mediaData) => {
  return {
    type: appConstants.MEDIA_UPLOAD_SUCCESS,
    mediaData
  }
}

const mediaUploadError = (errorMessage) => {
  return {
    type: appConstants.MEDIA_UPLOAD_FAILURE,
    errorMessage
  }
}

const requestMediaDelete = () => {
  return {
    type: appConstants.MEDIA_DELETE_REQUEST,
    status: false
  }
}

const receiveMediaDelete = () => {
  return {
    type: appConstants.MEDIA_DELETE_SUCCESS,
    status: true
  }
}

const mediaDeleteError = () => {
  return {
    type: appConstants.MEDIA_DELETE_FAILURE,
    status: false
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
  mediaInfoError,
  requestMediaDelete,
  receiveMediaDelete,
  mediaDeleteError
}

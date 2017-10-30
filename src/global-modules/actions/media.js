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

export {
  requestMedaUpload,
  receiveMediaUpload,
  mediaUploadError
}

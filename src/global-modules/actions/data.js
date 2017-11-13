import appConstants from '../constants'

const requestUserData = () => {
  return {
    type: appConstants.USER_DATA_REQUEST,
    isFetchingUser: true,
    userData: {},
    errorMessage: ''
  }
}

const receiveUserData = (userData) => {
  return {
    type: appConstants.USER_DATA_SUCCESS,
    isFetchingUser: false,
    userData,
    errorMesage: ''
  }
}

const userDataError = (errorMessage) => {
  return {
    type: appConstants.USER_DATA_FAILURE,
    isFetchingUser: false,
    userData: {},
    errorMessage
  }
}

const requestUserMedia = (mediaLimit, indexOffset) => {
  return {
    type: appConstants.USER_MEDIA_REQUEST,
    isFetchingMedia: true,
    userMedia: {},
    mediaLimit,
    indexOffset,
    errorMessage: ''
  }
}

const receiveUserMedia = (userMedia) => {
  return {
    type: appConstants.USER_MEDIA_SUCCESS,
    isFetchingMedia: false,
    userMedia,
    errorMesage: ''
  }
}

const userMediaError = (errorMessage) => {
  return {
    type: appConstants.USER_MEDIA_FAILURE,
    isFetchingMedia: false,
    userMedia: {},
    mediaLimit: 10,
    indexOffset: 0,
    errorMessage
  }
}

export {
  requestUserData,
  receiveUserData,
  userDataError,
  requestUserMedia,
  receiveUserMedia,
  userMediaError
}

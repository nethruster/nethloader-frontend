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

const requestUserMedia = () => {
  return {
    type: appConstants.USER_MEDIA_REQUEST,
    isFetchingMedia: true,
    userMedia: {},
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

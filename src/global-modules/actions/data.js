import appConstants from '../constants'

// User data
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

// User media
const requestUserMedia = (params) => {
  return {
    type: appConstants.USER_MEDIA_REQUEST,
    isFetchingMedia: true,
    userMedia: {},
    params,
    errorMessage: ''
  }
}

const receiveUserMedia = (userMedia, totalCount) => {
  return {
    type: appConstants.USER_MEDIA_SUCCESS,
    isFetchingMedia: false,
    userMedia,
    totalCount,
    errorMesage: ''
  }
}

const userMediaError = (errorMessage) => {
  return {
    type: appConstants.USER_MEDIA_FAILURE,
    isFetchingMedia: false,
    userMedia: {},
    params: {
      mediaLimit: 10,
      type: '',
      afterDate: '',
      beforeDate: '',
      offset: 0
    },
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

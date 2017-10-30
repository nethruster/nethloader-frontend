import appConstants from '../constants'

const requestUserData = () => {
  return {
    type: appConstants.USER_DATA_REQUEST,
    hasData: false,
    data: {},
    errorMessage: ''
  }
}

const receiveUserData = (data) => {
  return {
    type: appConstants.USER_DATA_SUCCESS,
    hasData: true,
    data,
    errorMesage: ''
  }
}

const userDataError = (errorMessage) => {
  return {
    type: appConstants.USER_DATA_FAILURE,
    hasData: false,
    data: {},
    errorMessage
  }
}

export {
  requestUserData,
  receiveUserData,
  userDataError
}

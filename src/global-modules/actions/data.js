import appConstants from '../constants'

const requestUserData = () => {
  return {
    type: appConstants.USER_DATA_REQUEST,
    hasData: false,
    data: {}
  }
}

const receiveUserData = (data) => {
  return {
    type: appConstants.USER_DATA_SUCCESS,
    hasData: true,
    data
  }
}

const userDataError = (errorMessage) => {
  return {
    type: appConstants.USER_DATA_FAILURE,
    hasData: false,
    errorMessage
  }
}

export {
  requestUserData,
  receiveUserData,
  userDataError
}

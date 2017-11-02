import appConstants from '../constants'

const requestUserData = () => {
  return {
    type: appConstants.USER_DATA_REQUEST,
    isFetching: true,
    data: {},
    errorMessage: ''
  }
}

const receiveUserData = (data) => {
  return {
    type: appConstants.USER_DATA_SUCCESS,
    isFetching: false,
    data,
    errorMesage: ''
  }
}

const userDataError = (errorMessage) => {
  return {
    type: appConstants.USER_DATA_FAILURE,
    isFetching: false,
    data: {},
    errorMessage
  }
}

export {
  requestUserData,
  receiveUserData,
  userDataError
}

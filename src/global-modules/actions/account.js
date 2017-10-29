import appConstants from '../constants'

// Register
const requestRegister = () => {
  return {
    type: appConstants.REGISTER_REQUEST,
    isFetching: true
  }
}

const receiveRegister = () => {
  return {
    type: appConstants.REGISTER_SUCCESS,
    isFetching: false
  }
}

const registerError = (errorMessage) => {
  return {
    type: appConstants.REGISTER_FAILURE,
    isFetching: false,
    errorMessage
  }
}

export {
  requestRegister,
  receiveRegister,
  registerError
}

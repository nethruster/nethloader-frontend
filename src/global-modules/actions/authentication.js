import appConstants from '../constants'

// Login
const requestLogin = () => {
  return {
    type: appConstants.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    sessionData: '',
    token: ''
  }
}

const requestLoginData = () => {
  return {
    type: appConstants.LOGIN_REQUEST_DATA,
    isFetching: true
  }
}

const receiveLogin = (token, sessionData) => {
  return {
    type: appConstants.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    sessionData,
    token
  }
}

const loginError = (errorMessage) => {
  return {
    type: appConstants.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    sessionData: '',
    token: '',
    errorMessage
  }
}

// Register
const requestRegister = () => {
  return {
    type: appConstants.REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    sessionData: '',
    token: ''
  }
}

const receiveRegister = (token, sessionData) => {
  return {
    type: appConstants.REGISTER_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    sessionData,
    token
  }
}

const registerError = (errorMessage) => {
  return {
    type: appConstants.REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    sessionData: '',
    token: '',
    errorMessage
  }
}

// Logout
const requestLogout = () => {
  return {
    type: appConstants.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

const receiveLogout = () => {
  return {
    type: appConstants.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    sessionData: '',
    token: ''
  }
}

export {
  requestLogin,
  receiveLogin,
  loginError,
  requestRegister,
  receiveRegister,
  registerError,
  requestLogout,
  receiveLogout,
  requestLoginData
}

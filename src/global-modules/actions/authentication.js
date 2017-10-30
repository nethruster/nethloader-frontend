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

  requestLogout,
  receiveLogout
}

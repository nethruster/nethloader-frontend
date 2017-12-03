import appConstants from '../constants'

// Auth reducer
const auth = (state = {
  isFetching: false,
  isAuthenticated: !!window.localStorage.getItem('neth-jwtToken') || false,
  sessionData: JSON.parse(window.localStorage.getItem('neth-sessionData')) || {},
  token: window.localStorage.getItem('neth-jwtToken') || ''
}, action) => {
  switch (action.type) {
    case appConstants.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        sessionData: '',
        token: ''
      })
    case appConstants.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        sessionData: action.sessionData,
        token: action.token,
        errorMessage: ''
      })
    case appConstants.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        sessionData: '',
        token: '',
        errorMessage: action.errorMessage
      })
    case appConstants.REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        sessionData: '',
        token: ''
      })
    case appConstants.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        sessionData: action.sessionData,
        token: action.token,
        errorMessage: ''
      })
    case appConstants.REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        sessionData: '',
        token: '',
        errorMessage: action.errorMessage
      })
    case appConstants.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true
      })
    case appConstants.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        sessionData: '',
        token: ''
      })
    default:
      return state
  }
}

export default auth

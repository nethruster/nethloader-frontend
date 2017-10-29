import appConstants from '../constants'

// Auth reducer
const auth = (state = {
  isFetching: false,
  isAuthenticated: !!window.localStorage.getItem('neth-jwtToken')
}, action) => {
  switch (action.type) {
    case appConstants.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case appConstants.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case appConstants.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
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
        isAuthenticated: false
      })
    default:
      return state
  }
}

export default auth

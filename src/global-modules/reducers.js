import { combineReducers } from 'redux'

import appConstants from './constants'

const initialState = {
  isFetching: false,
  isAuthenticated: !!window.localStorage.getItem('jwtToken')
}

// Auth reducer
const auth = (state = initialState, action) => {
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
        errorMessage: action.message
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

const reducers = combineReducers({
  auth
})

export default reducers

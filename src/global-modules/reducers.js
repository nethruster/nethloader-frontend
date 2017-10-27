import { combineReducers } from 'redux'

import appConstants from './constants'

// Auth reducer
const auth = (state = {
  isFetching: false,
  isAuthenticated: !!window.localStorage.getItem('jwtToken')
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

// Register reducer
const account = (state = {
  isFetching: false
}, action) => {
  switch (action.type) {
    case appConstants.REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case appConstants.REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: ''
      })
    case appConstants.REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}

const reducers = combineReducers({
  auth,
  account
})

export default reducers

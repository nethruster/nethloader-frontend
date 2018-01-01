import appConstants from '../constants'

// Settings reducer
const settings = (state = {
  isFetching: false,
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case appConstants.REQUEST_CHANGE_SETTING:
      return Object.assign({}, state, {
        isFetching: true
      })
    case appConstants.RECIEVE_CHANGE_SETTING:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: ''
      })
    case appConstants.CHANGE_SETTING_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

export default settings

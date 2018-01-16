import appConstants from '../constants'

// Settings reducer
const settings = (state = {
  isFetching: false,
  data: null,
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case appConstants.CHANGE_SETTING_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case appConstants.CHANGE_SETTING_RECIEVE:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        errorMessage: ''
      })
    case appConstants.ERROR_CHANGE_SETTING:
      return Object.assign({}, state, {
        isFetching: false,
        data: null,
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

export default settings

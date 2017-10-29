import appConstants from '../constants'

// Account reducer
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
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

export default account

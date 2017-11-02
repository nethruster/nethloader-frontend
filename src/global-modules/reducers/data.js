import appConstants from '../constants'

// Data reducer
const data = (state = {
  isFetching: false,
  data: JSON.parse(window.localStorage.getItem('neth-userData')) || {},
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case appConstants.USER_DATA_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        data: {},
        errorMessage: ''
      })
    case appConstants.USER_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        errorMessage: ''
      })
    case appConstants.USER_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        data: {},
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

export default data

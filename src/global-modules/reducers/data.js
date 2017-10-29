import appConstants from '../constants'

// Data reducer
const data = (state = {
  isFetching: false,
  hasData: !!window.localStorage.getItem('neth-userData'),
  data: JSON.parse(window.localStorage.getItem('neth-userData')) || {}
}, action) => {
  switch (action.type) {
    case appConstants.USER_DATA_REQUEST:
      return Object.assign({}, state, {
        hasData: false,
        data: {}
      })
    case appConstants.USER_DATA_SUCCESS:
      return Object.assign({}, state, {
        hasData: true,
        data: action.data
      })
    case appConstants.USER_DATA_FAILURE:
      return Object.assign({}, state, {
        hasData: false,
        data: {},
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

export default data

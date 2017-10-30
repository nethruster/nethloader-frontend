import appConstants from '../constants'

// Media reducer
const media = (state = {
  isFetching: false,
  data: {}
}, action) => {
  switch (action.type) {
    case appConstants.MEDIA_UPLOAD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        data: {}
      })
    case appConstants.MEDIA_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data
      })
    case appConstants.MEDIA_UPLOAD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        data: {},
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

export default media

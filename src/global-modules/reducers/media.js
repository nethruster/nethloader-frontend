import appConstants from '../constants'

// Media reducer
const media = (state = {
  isFetching: false,
  data: {},
  mediaInfo: {},
  isUploading: false
}, action) => {
  switch (action.type) {
    case appConstants.MEDIA_UPLOAD_REQUEST:
      return Object.assign({}, state, {
        isUploading: true,
        data: {}
      })
    case appConstants.MEDIA_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        isUploading: false,
        data: action.data
      })
    case appConstants.MEDIA_UPLOAD_FAILURE:
      return Object.assign({}, state, {
        isUploading: false,
        data: {},
        errorMessage: action.errorMessage
      })
    case appConstants.MEDIA_INFO_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        mediaInfo: {},
        errorMessage: action.errorMessage
      })
    case appConstants.MEDIA_INFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        mediaInfo: action.mediaInfo
      })
    case appConstants.MEDIA_INFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        mediaInfo: {},
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

export default media

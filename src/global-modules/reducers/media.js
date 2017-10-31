import appConstants from '../constants'

// Media reducer
const mediaUpload = (state = {
  data: {}
}, action) => {
  switch (action.type) {
    case appConstants.MEDIA_UPLOAD_REQUEST:
      return Object.assign({}, state, {
        data: {}
      })
    case appConstants.MEDIA_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        data: action.data
      })
    case appConstants.MEDIA_UPLOAD_FAILURE:
      return Object.assign({}, state, {
        data: {},
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

const mediaInfo = (state = {
  isFetching: false,
  mediaInfo: {}
}, action) => {
  switch (action.type) {
    case appConstants.MEDIA_INFO_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        mediaInfo: {}
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

export {
  mediaUpload,
  mediaInfo
}

import appConstants from '../constants'

// Media reducers

const mediaUpload = (state = {
  mediaData: {}
}, action) => {
  switch (action.type) {
    case appConstants.MEDIA_UPLOAD_REQUEST:
      return Object.assign({}, state, {
        mediaData: {}
      })
    case appConstants.MEDIA_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        mediaData: action.mediaData
      })
    case appConstants.MEDIA_UPLOAD_FAILURE:
      return Object.assign({}, state, {
        mediaData: {},
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

const mediaDelete = (state = {
  status: false
}, action) => {
  switch (action.type) {
    case appConstants.MEDIA_DELETE_REQUEST:
      return Object.assign({}, state, {
        status: false
      })
    case appConstants.MEDIA_DELETE_SUCCESS:
      return Object.assign({}, state, {
        status: true
      })
    case appConstants.MEDIA_DELETE_FAILURE:
      return Object.assign({}, state, {
        status: false,
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

const mediaInfo = (state = {
  isFetching: false,
  mediaInfo: null
}, action) => {
  switch (action.type) {
    case appConstants.MEDIA_INFO_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        mediaInfo: null
      })
    case appConstants.MEDIA_INFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        mediaInfo: action.mediaInfo
      })
    case appConstants.MEDIA_INFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        mediaInfo: null,
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

const mediaSelect = (state = {
  selectedMedia: [],
  allToggled: false
}, action) => {
  switch (action.type) {
    case appConstants.MEDIA_SELECT:
      return Object.assign({}, state, {
        selectedMedia: action.selectedMedia,
        allToggled: action.allToggled
      })
    case appConstants.MEDIA_UNSELECT:
      return Object.assign({}, state, {
        selectedMedia: action.selectedMedia,
        allToggled: false
      })
    case appConstants.MEDIA_SELECT_ALL:
      return Object.assign({}, state, {
        selectedMedia: action.selectedMedia,
        allToggled: true
      })
    case appConstants.MEDIA_UNSELECT_ALL:
      return Object.assign({}, state, {
        selectedMedia: [],
        allToggled: false
      })
    default:
      return state
  }
}

export {
  mediaUpload,
  mediaInfo,
  mediaDelete,
  mediaSelect
}

import appConstants from '../constants'

// Upload media
const requestMediaUpload = () => {
  return {
    type: appConstants.MEDIA_UPLOAD_REQUEST,
    mediaData: {}
  }
}

const receiveMediaUpload = (mediaData) => {
  return {
    type: appConstants.MEDIA_UPLOAD_SUCCESS,
    mediaData
  }
}

const mediaUploadError = (errorMessage) => {
  return {
    type: appConstants.MEDIA_UPLOAD_FAILURE,
    errorMessage
  }
}

// Delete media
const requestMediaDelete = () => {
  return {
    type: appConstants.MEDIA_DELETE_REQUEST,
    status: false
  }
}

const receiveMediaDelete = () => {
  return {
    type: appConstants.MEDIA_DELETE_SUCCESS,
    status: true
  }
}

const mediaDeleteError = () => {
  return {
    type: appConstants.MEDIA_DELETE_FAILURE,
    status: false
  }
}

// Media info
const requestMediaInfo = () => {
  return {
    type: appConstants.MEDIA_INFO_REQUEST,
    isFetching: true,
    mediaInfo: null
  }
}

const receiveMediaInfo = (mediaInfo) => {
  return {
    type: appConstants.MEDIA_INFO_SUCCESS,
    isFetching: false,
    mediaInfo
  }
}

const mediaInfoError = (errorMessage) => {
  return {
    type: appConstants.MEDIA_INFO_FAILURE,
    isFetching: false,
    mediaInfo: null,
    errorMessage
  }
}

// Select media
const mediaSelect = (selectedMedia) => {
  return {
    type: appConstants.MEDIA_SELECT,
    selectedMedia
  }
}

const mediaUnselect = (selectedMedia) => {
  return {
    type: appConstants.MEDIA_UNSELECT,
    selectedMedia
  }
}

const mediaSelectAll = (selectedMedia) => {
  return {
    type: appConstants.MEDIA_SELECT_ALL,
    selectedMedia,
    allToggled: true
  }
}

const mediaUnselectAll = () => {
  return {
    type: appConstants.MEDIA_UNSELECT_ALL,
    selectedMedia: [],
    allToggled: false
  }
}

export {
  requestMediaUpload,
  receiveMediaUpload,
  mediaUploadError,
  requestMediaInfo,
  receiveMediaInfo,
  mediaInfoError,
  requestMediaDelete,
  receiveMediaDelete,
  mediaDeleteError,
  mediaSelect,
  mediaUnselect,
  mediaSelectAll,
  mediaUnselectAll
}

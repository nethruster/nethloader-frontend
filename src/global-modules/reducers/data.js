import appConstants from '../constants'

// Data reducer
const userData = (state = {
  isFetchingUser: false,
  userData: JSON.parse(window.sessionStorage.getItem('neth-userData')) || {},
  strData: JSON.parse(window.localStorage.getItem('neth-strData')) || {},
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case appConstants.USER_DATA_REQUEST:
      return Object.assign({}, state, {
        isFetchingUser: true,
        errorMessage: ''
      })
    case appConstants.USER_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetchingUser: false,
        userData: action.userData,
        errorMessage: ''
      })
    case appConstants.USER_DATA_FAILURE:
      return Object.assign({}, state, {
        isFetchingUser: false,
        userData: {},
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

// Media reducer
const userMedia = (state = {
  isFetchingMedia: false,
  userMedia: JSON.parse(window.localStorage.getItem('neth-userMedia')) || {},
  totalCount: JSON.parse(window.localStorage.getItem('neth-totalCount')) || 0,
  params: {
    mediaLimit: 10,
    type: '',
    afterDate: '',
    beforeDate: '',
    offset: 0
  },
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case appConstants.USER_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isFetchingMedia: true,
        params: {
          mediaLimit: action.params.mediaLimit || 10,
          type: action.params.type || '',
          afterDate: action.params.afterDate || '',
          beforeDate: action.params.beforeDate || '',
          offset: action.params.offset || 0
        },
        errorMessage: ''
      })
    case appConstants.USER_MEDIA_SUCCESS:
      return Object.assign({}, state, {
        isFetchingMedia: false,
        userMedia: action.userMedia,
        totalCount: action.totalCount,
        errorMessage: ''
      })
    case appConstants.USER_MEDIA_FAILURE:
      return Object.assign({}, state, {
        isFetchingMedia: false,
        userMedia: {},
        params: {
          mediaLimit: 10,
          type: '',
          afterDate: '',
          beforeDate: '',
          offset: 0
        },
        totalCount: 0,
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

export {
  userData,
  userMedia
}

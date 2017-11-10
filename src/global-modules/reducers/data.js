import appConstants from '../constants'

// Data reducer
const userData = (state = {
  isFetchingUser: true,
  userData: JSON.parse(window.sessionStorage.getItem('neth-userData')),
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case appConstants.USER_DATA_REQUEST:
      return Object.assign({}, state, {
        isFetchingUser: true,
        userData: {},
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

const userMedia = (state = {
  isFetchingMedia: true,
  userMedia: JSON.parse(window.localStorage.getItem('neth-userMedia')),
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case appConstants.USER_MEDIA_REQUEST:
      return Object.assign({}, state, {
        isFetchingMedia: true,
        userMedia: {},
        errorMessage: ''
      })
    case appConstants.USER_MEDIA_SUCCESS:
      return Object.assign({}, state, {
        isFetchingMedia: false,
        userMedia: action.userMedia,
        errorMessage: ''
      })
    case appConstants.USER_MEDIA_FAILURE:
      return Object.assign({}, state, {
        isFetchingMedia: false,
        userMedia: {},
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

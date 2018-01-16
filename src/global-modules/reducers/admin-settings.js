import appConstants from '../constants'

const media = (state = {
  isFetchingMedia: false,
  mData: null,
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case appConstants.MEDIA_REQUEST:
      return Object.assign({}, state, {
        isFetchingMedia: true
      })
    case appConstants.MEDIA_RECIEVE:
      return Object.assign({}, state, {
        isFetchingMedia: false,
        mData: action.mData,
        errorMessage: ''
      })
    case appConstants.ERROR_MEDIA:
      return Object.assign({}, state, {
        isFetchingMedia: false,
        mData: null,
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

const users = (state = {
  isFetchingUsers: false,
  uData: null,
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case appConstants.USERS_REQUEST:
      return Object.assign({}, state, {
        isFetchingUsers: true
      })
    case appConstants.USERS_RECIEVE:
      return Object.assign({}, state, {
        isFetchingUsers: false,
        uData: action.uData,
        errorMessage: ''
      })
    case appConstants.ERROR_USERS:
      return Object.assign({}, state, {
        isFetchingUsers: false,
        uData: null,
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

// Delete user
const userDelete = (state = {
  isFetchingDeleteUser: false,
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case appConstants.USER_DELETE_REQUEST:
      return Object.assign({}, state, {
        isFetchingDeleteUser: true
      })
    case appConstants.USER_DELETE_RECIEVE:
      return Object.assign({}, state, {
        isFetchingDeleteUser: false
      })
    case appConstants.ERROR_USER_DELETE:
      return Object.assign({}, state, {
        isFetchingDeleteUser: false,
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

// Create user
const userCreate = (state = {
  isFetchingCreateUser: false,
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case appConstants.USER_CREATE_REQUEST:
      return Object.assign({}, state, {
        isFetchingCreateUser: true
      })
    case appConstants.USER_CREATE_RECIEVE:
      return Object.assign({}, state, {
        isFetchingCreateUser: false
      })
    case appConstants.ERROR_USER_CREATE:
      return Object.assign({}, state, {
        isFetchingCreateUser: false,
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

const userSelect = (state = {
  selectedUsers: [],
  allToggled: false
}, action) => {
  switch (action.type) {
    case appConstants.USER_SELECT:
      return Object.assign({}, state, {
        selectedUsers: action.selectedUsers
      })
    case appConstants.USER_UNSELECT:
      return Object.assign({}, state, {
        selectedUsers: action.selectedUsers
      })
    case appConstants.USER_SELECT_ALL:
      return Object.assign({}, state, {
        selectedUsers: action.selectedUsers,
        allToggled: true
      })
    case appConstants.USER_UNSELECT_ALL:
      return Object.assign({}, state, {
        selectedUsers: [],
        allToggled: false
      })
    default:
      return state
  }
}

// Create user
const toggleIsAdmin = (state = {
  isFetchingtoggleAdmin: false,
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case appConstants.TOGGLE_ADMIN_REQUEST:
      return Object.assign({}, state, {
        isFetchingtoggleAdmin: true
      })
    case appConstants.TOGGLE_ADMIN_RECIEVE:
      return Object.assign({}, state, {
        isFetchingtoggleAdmin: false
      })
    case appConstants.ERROR_TOGGLE_ADMIN:
      return Object.assign({}, state, {
        isFetchingtoggleAdmin: false,
        errorMessage: action.errorMessage
      })
    default:
      return state
  }
}

export {
  media,
  users,
  userDelete,
  userSelect,
  userCreate,
  toggleIsAdmin
}

import appConstants from '../constants'

// Get all users
const requestUsers = () => {
  return {
    type: appConstants.USERS_REQUEST,
    isFetchingUsers: true
  }
}

const recieveUsers = (uData) => {
  return {
    type: appConstants.USERS_RECIEVE,
    uData,
    isFetchingUsers: false
  }
}

const usersError = (errorMessage) => {
  return {
    type: appConstants.ERROR_USERS,
    isFetchingUsers: false,
    errorMessage
  }
}

// Delete user
const requestDeleteUser = () => {
  return {
    type: appConstants.USER_DELETE_REQUEST,
    isFetchingDeleteUser: true
  }
}

const recieveDeleteUser = () => {
  return {
    type: appConstants.USER_DELETE_RECIEVE,
    isFetchingDeleteUser: false
  }
}

const deleteUserError = (errorMessage) => {
  return {
    type: appConstants.ERROR_USER_DELETE,
    isFetchingDeleteUser: false,
    errorMessage
  }
}

// Create new user
const requestCreateUser = () => {
  return {
    type: appConstants.USER_CREATE_REQUEST,
    isFetchingCreateUser: true
  }
}

const recieveCreateUser = () => {
  return {
    type: appConstants.USER_CREATE_RECIEVE,
    isFetchingCreateUser: false
  }
}

const createUserError = (errorMessage) => {
  return {
    type: appConstants.ERROR_USER_CREATE,
    isFetchingCreateUser: false,
    errorMessage
  }
}

// Get all media
const requestMedia = () => {
  return {
    type: appConstants.MEDIA_REQUEST,
    isFetchingMedia: true
  }
}

const recieveMedia = (mData) => {
  return {
    type: appConstants.MEDIA_RECIEVE,
    mData,
    isFetchingMedia: false
  }
}

const mediaError = (errorMessage) => {
  return {
    type: appConstants.ERROR_MEDIA,
    isFetchingMedia: false,
    errorMessage
  }
}

// Select user
const userSelect = (selectedUsers, allToggled) => {
  return {
    type: appConstants.USER_SELECT,
    selectedUsers,
    allToggled
  }
}

const userUnselect = (selectedUsers) => {
  return {
    type: appConstants.USER_UNSELECT,
    selectedUsers,
    allToggled: false
  }
}

const userSelectAll = (selectedUsers) => {
  return {
    type: appConstants.USER_SELECT_ALL,
    selectedUsers,
    allToggled: true
  }
}

const userUnselectAll = () => {
  return {
    type: appConstants.USER_UNSELECT_ALL,
    selectedUsers: [],
    allToggled: false
  }
}

// Create new user
const requestToggleAdmin = () => {
  return {
    type: appConstants.TOGGLE_ADMIN_REQUEST,
    isFetchingtoggleAdmin: true
  }
}

const recieveToggleAdmin = () => {
  return {
    type: appConstants.TOGGLE_ADMIN_RECIEVE,
    isFetchingtoggleAdmin: false
  }
}

const toggleAdminError = (errorMessage) => {
  return {
    type: appConstants.ERROR_TOGGLE_ADMIN,
    isFetchingtoggleAdmin: false,
    errorMessage
  }
}

export {
  requestUsers,
  recieveUsers,
  usersError,
  requestDeleteUser,
  recieveDeleteUser,
  deleteUserError,
  requestCreateUser,
  recieveCreateUser,
  createUserError,
  requestMedia,
  recieveMedia,
  mediaError,
  userSelect,
  userUnselect,
  userSelectAll,
  userUnselectAll,
  requestToggleAdmin,
  recieveToggleAdmin,
  toggleAdminError,
  mediaSelect,
  mediaUnselect,
  mediaSelectAll,
  mediaUnselectAll
}

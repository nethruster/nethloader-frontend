import appConstants from '../constants'

// Login
const requestSettingChange = () => {
  return {
    type: appConstants.CHANGE_SETTING_REQUEST,
    isFetching: true
  }
}

const receiveSettingChange = () => {
  return {
    type: appConstants.CHANGE_SETTING_RECIEVE,
    isFetching: false
  }
}

const settingChangeError = (errorMessage) => {
  return {
    type: appConstants.ERROR_CHANGE_SETTING,
    isFetching: false,
    errorMessage
  }
}

export {
  requestSettingChange,
  receiveSettingChange,
  settingChangeError
}

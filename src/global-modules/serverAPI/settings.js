import {apiBaseUrl} from 'app.config'

import {
  requestSettingChange, receiveSettingChange, settingChangeError
} from 'actions/settings'

// Change username
const changeUserName = (newUsername, userId, authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `mutation{ changeUserName(userId: "${userId}", newName: "${newUsername}") {name} }`
    })
  }

  return async dispatch => {
    dispatch(requestSettingChange())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.changeUserName) {
        // Dispatch the success action
        dispatch(receiveSettingChange())
        return responseData.data
      }
      console.log('registerUser - changeUserName: ', responseData)
      dispatch(settingChangeError(responseData.errors[0].message))
      return Promise.reject(responseData.errors[0].message)
    }
    console.log('registerUser - changeUserName: ', serverResponse)
    dispatch(settingChangeError(serverResponse.status))
    return Promise.reject(serverResponse.status)
  }
}

// Change email
const changeUserEmail = (newEmail, userId, authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `mutation{ changeUserEmail(userId: "${userId}", newEmail: "${newEmail}") {email} }`
    })
  }

  return async dispatch => {
    dispatch(requestSettingChange())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.changeUserEmail) {
        // Dispatch the success action
        dispatch(receiveSettingChange())
      } else {
        console.log('changeUserEmail - responseData: ', responseData)
        dispatch(settingChangeError(responseData.errors[0].message))
        return Promise.reject(responseData.errors[0].message)
      }
    } else {
      console.log('changeUserEmail - serverResponse: ', serverResponse)
      dispatch(settingChangeError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}

// Change password
const changeUserPassword = (oldPassword, newPassword, userId, authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `mutation{ changeUserPassword(userId: "${userId}", oldPassword: "${oldPassword}", newPassword: "${newPassword}") {id} }`
    })
  }

  return async dispatch => {
    dispatch(requestSettingChange())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.changeUserPassword) {
        // Dispatch the success action
        dispatch(receiveSettingChange())
      } else {
        console.log('changeUserPassword - responseData: ', responseData)
        dispatch(settingChangeError(responseData.errors[0].message))
        return Promise.reject(responseData.errors[0].message)
      }
    } else {
      console.log('changeUserPassword - serverResponse: ', serverResponse)
      dispatch(settingChangeError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}

// Renew apikey
const renewUserApiKey = (userId, authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `mutation{ renewUserApiKey(userId: "${userId}") {id} }`
    })
  }

  return async dispatch => {
    dispatch(requestSettingChange())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.renewUserApiKey) {
        // Dispatch the success action
        dispatch(receiveSettingChange())
      } else {
        console.log('renewUserApiKey - responseData: ', responseData)
        dispatch(settingChangeError(responseData.errors[0].message))
        return Promise.reject(responseData.errors[0].message)
      }
    } else {
      console.log('renewUserApiKey - serverResponse: ', serverResponse)
      dispatch(settingChangeError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}

// Delete all media
const deleteAllUserImages = (userId, authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `mutation{ deleteAllUserImages(userId: "${userId}")}`
    })
  }

  return async dispatch => {
    dispatch(requestSettingChange())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.deleteAllUserImages) {
        // Dispatch the success action
        dispatch(receiveSettingChange())
      } else {
        console.log('deleteAllUserImages - responseData: ', responseData)
        dispatch(settingChangeError(responseData.errors[0].message))
        return Promise.reject(responseData.errors[0].message)
      }
    } else {
      console.log('deleteAllUserImages - serverResponse: ', serverResponse)
      dispatch(settingChangeError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}

// Delete user
const deleteUser = (userId, authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `mutation{ deleteUser(userId: "${userId}")}`
    })
  }

  return async dispatch => {
    dispatch(requestSettingChange())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.deleteUser) {
        // Dispatch the success action
        dispatch(receiveSettingChange())
      } else {
        console.log('deleteUser - responseData: ', responseData)
        dispatch(settingChangeError(responseData.errors[0].message))
        return Promise.reject(responseData.errors[0].message)
      }
    } else {
      console.log('deleteUser - serverResponse: ', serverResponse)
      dispatch(settingChangeError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}

export {
  changeUserName,
  changeUserEmail,
  changeUserPassword,
  renewUserApiKey,
  deleteAllUserImages,
  deleteUser
}

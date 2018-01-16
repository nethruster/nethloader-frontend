import {apiBaseUrl} from 'app.config'

import {
  requestUsers, recieveUsers, usersError,
  requestMedia, recieveMedia, mediaError
} from 'actions/admin-settings'
import {
  requestDeleteUser, recieveDeleteUser, deleteUserError,
  requestCreateUser, recieveCreateUser, createUserError,
  requestToggleAdmin, recieveToggleAdmin, toggleAdminError
} from '../actions/admin-settings'

// Get all users
const getUsers = (authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `query{ users {id, name, email, apiKey, isAdmin}}`
    })
  }

  return async dispatch => {
    dispatch(requestUsers())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.users) {
        // Dispatch the success action
        dispatch(recieveUsers(responseData.data.users))

        return responseData.data.users
      }
      console.log('getUsers - responseData: ', responseData)
      dispatch(usersError(responseData.errors[0].message))
      return Promise.reject(responseData.errors[0].message)
    }
    console.log('getUsers - serverResponse: ', serverResponse)
    dispatch(usersError(serverResponse.status))
    return Promise.reject(serverResponse.status)
  }
}

// Delete
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
    dispatch(requestDeleteUser())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)
    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.deleteUser) {
        // Dispatch the success action
        dispatch(recieveDeleteUser())
      } else {
        console.log('deleteUser - responseData:', responseData)
        dispatch(deleteUserError(responseData))
        return Promise.reject(responseData)
      }
    } else {
      console.log('deleteUser - serverResponse:', serverResponse)
      dispatch(deleteUserError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}

// Create user
const createUser = (username, email, password, willBeAdmin, authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `mutation{ createUser(name: "${username}", email: "${email}", password: "${password}", isAdmin: ${willBeAdmin}) {id} }`
    })
  }

  return async dispatch => {
    dispatch(requestCreateUser())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.createUser) {
        // Dispatch the success action
        dispatch(recieveCreateUser())
      } else {
        console.log('createUser - responseData: ', responseData)
        dispatch(createUserError(responseData.errors[0].message))
        return Promise.reject(responseData.errors[0].message)
      }
    } else {
      console.log('createUser - serverResponse: ', serverResponse)
      dispatch(createUserError(serverResponse.status))
      return Promise.reject(serverResponse.status)
    }
  }
}

// Get all media
const getMedia = (authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `query{ images {totalCount, images{id, extension, user{id}, createdAt}}}`
    })
  }

  return async dispatch => {
    dispatch(requestMedia())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.images) {
        // Dispatch the success action
        dispatch(recieveMedia(responseData.data.images.images))

        return responseData.data.images.images
      }
      console.log('getMedia - responseData: ', responseData)
      dispatch(mediaError(responseData.errors[0].message))
      return Promise.reject(responseData.errors[0].message)
    }
    console.log('getMedia - serverResponse: ', serverResponse)
    dispatch(mediaError(serverResponse.status))
    return Promise.reject(serverResponse.status)
  }
}

// Get all media
const toggleIsAdmin = (userId, isAdmin, authToken) => {
  let requestConfig = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authentication': authToken
    },
    body: JSON.stringify({
      query: `mutation{ changeUserIsAdmin (userId: "${userId}", isAdmin: ${isAdmin}){id}}`
    })
  }

  return async dispatch => {
    dispatch(requestToggleAdmin())

    let serverResponse = await fetch(apiBaseUrl, requestConfig)

    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      let responseData = await serverResponse.json()

      if (responseData.data.changeUserIsAdmin) {
        // Dispatch the success action
        dispatch(recieveToggleAdmin(responseData.data.changeUserIsAdmin))

        return responseData.data.changeUserIsAdmin
      }
      console.log('toggleIsAdmin - responseData: ', responseData)
      dispatch(toggleAdminError(responseData.errors[0].message))
      return Promise.reject(responseData.errors[0].message)
    }
    console.log('toggleIsAdmin - serverResponse: ', serverResponse)
    dispatch(toggleAdminError(serverResponse.status))
    return Promise.reject(serverResponse.status)
  }
}

export {
  getUsers,
  deleteUser,
  createUser,
  getMedia,
  toggleIsAdmin
}

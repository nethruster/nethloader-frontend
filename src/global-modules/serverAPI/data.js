import {
  requestUserMedia, receiveUserMedia,
  requestUserData, receiveUserData
} from 'actions/data'

// User data
const getUserData = (id, authToken) => {
  return async dispatch => {
    const data = {
      'name': 'demo',
      'email': 'demo@demo.com',
      'apiKey': 'ff0hEH7zvRDCYgASa3BTtwRb',
      'isAdmin': true
    }
    dispatch(requestUserData())
    // Set the data in local storage
    window.sessionStorage.setItem('neth-userData', JSON.stringify(data))
    // Dispatch the success action
    dispatch(receiveUserData(data))
  }
}

// User media
const getUserMedia = (id, authToken, params) => {
  return async dispatch => {
    dispatch(requestUserMedia(params))

    let totalCount = await getUserMediaCount(id, authToken)
    let data = {
      'totalCount': 10,
      'images': [
        {
          'id': 'w8fWWkiHc4',
          'createdAt': 'Tue Apr 10 2018 21:17:47 GMT+0000 (UTC)',
          'extension': 'png'
        },
        {
          'id': 'gX1YNaxZwk',
          'createdAt': 'Tue Apr 10 2018 21:06:49 GMT+0000 (UTC)',
          'extension': 'png'
        },
        {
          'id': 'jUvAVNJdoz',
          'createdAt': 'Mon Apr 09 2018 10:34:04 GMT+0000 (UTC)',
          'extension': 'png'
        },
        {
          'id': 'tNVeMnlHO7',
          'createdAt': 'Sun Apr 08 2018 16:07:53 GMT+0000 (UTC)',
          'extension': 'png'
        },
        {
          'id': '3TtUDlRrWb',
          'createdAt': 'Sun Apr 08 2018 16:07:14 GMT+0000 (UTC)',
          'extension': 'png'
        },
        {
          'id': '7be_IfpRB5',
          'createdAt': 'Tue Apr 03 2018 18:33:39 GMT+0000 (UTC)',
          'extension': 'png'
        },
        {
          'id': '1ZonWM6RJo',
          'createdAt': 'Sun Apr 01 2018 02:17:43 GMT+0000 (UTC)',
          'extension': 'png'
        },
        {
          'id': '_w2vtQ_HeR',
          'createdAt': 'Sun Apr 01 2018 02:01:52 GMT+0000 (UTC)',
          'extension': 'png'
        },
        {
          'id': '8FEee78cLc',
          'createdAt': 'Sun Apr 01 2018 01:56:27 GMT+0000 (UTC)',
          'extension': 'png'
        },
        {
          'id': '0MkVuEfOub',
          'createdAt': 'Sun Apr 01 2018 01:51:08 GMT+0000 (UTC)',
          'extension': 'mp4'
        }
      ]
    }

    window.localStorage.setItem('neth-userMedia', JSON.stringify(data))
    // Dispatch the success action
    dispatch(receiveUserMedia(data, totalCount))
  }
}

// Get total count of user images
const getUserMediaCount = async (id, authToken) => {
  window.localStorage.setItem('neth-totalCount', JSON.stringify(112))

  return 112
}

const getStorageParams = async (authToken) => {
  let data = {
    'unprocessableExtensions': [
      'webp',
      'webm',
      'svg'
    ],
    'supportedVideoExtensions': [
      'mp4',
      'ogg',
      'webm',
      'gif'
    ],
    'supportedImageExtensions': [
      'png',
      'jpg',
      'jpeg',
      'svg',
      'webp'
    ]
  }
  window.localStorage.setItem('neth-strData', JSON.stringify(data))
}

export {
  getUserData,
  getUserMedia,
  getUserMediaCount,
  getStorageParams
}

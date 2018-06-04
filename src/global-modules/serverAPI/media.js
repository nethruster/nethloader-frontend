import {requestMediaInfo, receiveMediaInfo} from 'actions/media'

// Upload
const uploadMedia = (media, authToken) => {

}

// Delete
const deleteMedia = (mediaId, authToken) => {

}

const getMediaInfo = (mediaId) => {
  return async dispatch => {
    let data = {
      'V2PvmS6pgk': {
        'id': 'V2PvmS6pgk',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        },
        'createdAt': 'Tue Apr 10 2018 21:36:55 GMT+0000 (UTC)'
      },
      'w8fWWkiHc4': {
        'id': 'w8fWWkiHc4',
        'createdAt': 'Tue Apr 10 2018 21:17:47 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      'gX1YNaxZwk': {
        'id': 'gX1YNaxZwk',
        'createdAt': 'Tue Apr 10 2018 21:06:49 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      'jUvAVNJdoz': {
        'id': 'jUvAVNJdoz',
        'createdAt': 'Mon Apr 09 2018 10:34:04 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      'tNVeMnlHO7': {
        'id': 'tNVeMnlHO7',
        'createdAt': 'Sun Apr 08 2018 16:07:53 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      'ufcQOpDxTb': {
        'id': 'ufcQOpDxTb',
        'createdAt': 'Sun Apr 08 2018 16:07:14 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      '7be_IfpRB5': {
        'id': '7be_IfpRB5',
        'createdAt': 'Tue Apr 03 2018 18:33:39 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      '1ZonWM6RJo': {
        'id': '1ZonWM6RJo',
        'createdAt': 'Sun Apr 01 2018 02:17:43 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      '3zkBvas0mY': {
        'id': '3zkBvas0mY',
        'createdAt': 'Sun Apr 01 2018 02:01:52 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      '8FEee78cLc': {
        'id': '8FEee78cLc',
        'createdAt': 'Sun Apr 01 2018 01:56:27 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      '6NbG4kXRi5': {
        'id': '6NbG4kXRi5',
        'createdAt': 'Sun Apr 01 2018 01:51:08 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      'AW3c4UytpN': {
        'id': 'AW3c4UytpN',
        'createdAt': 'Sun Apr 01 2018 01:37:11 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      '2dbNyPwkeW': {
        'id': '2dbNyPwkeW',
        'createdAt': 'Sun Apr 01 2018 00:05:32 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      'YmPWZHz5GW': {
        'id': 'YmPWZHz5GW',
        'createdAt': 'Sun Apr 01 2018 00:02:36 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      'VbdakO65ul': {
        'id': 'VbdakO65ul',
        'createdAt': 'Sat Mar 31 2018 03:03:38 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      'YJiHlqKZ00': {
        'id': 'YJiHlqKZ00',
        'createdAt': 'Sat Mar 31 2018 03:03:18 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      '0MkVuEfOub': {
        'id': '0MkVuEfOub',
        'createdAt': 'Fri Mar 30 2018 00:32:26 GMT+0000 (UTC)',
        'extension': 'mp4',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      '_w2vtQ_HeR': {
        'id': '_w2vtQ_HeR',
        'createdAt': 'Fri Mar 30 2018 00:04:55 GMT+0000 (UTC)',
        'extension': 'jpeg',
        'user': {
          'id': '7oKLbycuST'
        }
      },
      '3TtUDlRrWb': {
        'id': '3TtUDlRrWb',
        'createdAt': 'Thu Mar 29 2018 18:04:11 GMT+0000 (UTC)',
        'extension': 'png',
        'user': {
          'id': '7oKLbycuST'
        }
      }
    }
    dispatch(requestMediaInfo())

    dispatch(receiveMediaInfo(data[mediaId]))
    return data[mediaId]
  }
}

export {
  uploadMedia,
  getMediaInfo,
  deleteMedia
}

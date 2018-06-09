import {
  requestUsers, recieveUsers
} from 'actions/admin-settings'

// Get all users
const getUsers = (authToken) => {
  return async dispatch => {
    dispatch(requestUsers())
    const users = [
      {
        'id': 'aef8JbRGnj',
        'name': 'demo',
        'email': 'test@test.com',
        'apiKey': 'pKH15UhsX~nxmfTp2eg5cINJ',
        'isAdmin': true
      },
      {
        'id': 'E5Ws85hfHf',
        'name': 'Jack',
        'email': 'me@jack.com',
        'apiKey': 'g7b_5EaO5fWp9aJgcAt4t_V3',
        'isAdmin': true
      },
      {
        'id': '3489gmG1CU',
        'name': 'Max',
        'email': 'maximilian@gmoil.com',
        'apiKey': 'uB19zugalM2UHJ9gAq5GyIn6',
        'isAdmin': false
      },
      {
        'id': '~kiloftr40',
        'name': 'Laura',
        'email': 'anemail@email.com',
        'apiKey': 'mRtxv9hZyw05_R6Np6l8kalh',
        'isAdmin': true
      }
    ]
    dispatch(recieveUsers(users))

    return users
  }
}

// Delete
const deleteUser = (userId, authToken) => {

}

// Create user
const createUser = (username, email, password, willBeAdmin, authToken) => {

}

// Toggle is admin
const toggleIsAdmin = (userId, isAdmin, authToken) => {

}

export {
  getUsers,
  deleteUser,
  createUser,
  toggleIsAdmin
}

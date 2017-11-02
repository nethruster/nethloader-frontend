import { combineReducers } from 'redux'

import authentication from 'reducers/authentication'
import account from 'reducers/account'
import data from 'reducers/data'
import { mediaUpload, mediaInfo, mediaDelete } from 'reducers/media'

const reducers = combineReducers({
  authentication,
  account,
  data,
  mediaUpload,
  mediaInfo,
  mediaDelete
})

export default reducers

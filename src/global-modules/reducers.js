import { combineReducers } from 'redux'

import authentication from 'reducers/authentication'
import {userData, userMedia} from 'reducers/data'
import { mediaUpload, mediaInfo, mediaDelete, mediaSelect } from 'reducers/media'

const reducers = combineReducers({
  authentication,
  userData,
  userMedia,
  mediaUpload,
  mediaInfo,
  mediaDelete,
  mediaSelect
})

export default reducers

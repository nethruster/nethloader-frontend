import { combineReducers } from 'redux'

import authentication from 'reducers/authentication'
import data from 'reducers/data'
import { mediaUpload, mediaInfo, mediaDelete, mediaSelect } from 'reducers/media'

const reducers = combineReducers({
  authentication,
  data,
  mediaUpload,
  mediaInfo,
  mediaDelete,
  mediaSelect
})

export default reducers

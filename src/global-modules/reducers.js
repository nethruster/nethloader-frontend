import { combineReducers } from 'redux'

import authentication from 'reducers/authentication'
import account from 'reducers/account'
import data from 'reducers/data'
import {mediaUpload, mediaInfo} from 'reducers/media'

const reducers = combineReducers({
  authentication,
  account,
  data,
  mediaUpload,
  mediaInfo
})

export default reducers

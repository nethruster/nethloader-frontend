import { combineReducers } from 'redux'

import authentication from 'reducers/authentication'
import account from 'reducers/account'
import data from 'reducers/data'
import media from 'reducers/media'

const reducers = combineReducers({
  authentication,
  account,
  data,
  media
})

export default reducers

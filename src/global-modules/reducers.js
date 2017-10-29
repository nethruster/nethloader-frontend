import { combineReducers } from 'redux'

import auth from './reducers/auth'
import account from './reducers/account'
import data from './reducers/data'

const reducers = combineReducers({
  auth,
  account,
  data
})

export default reducers

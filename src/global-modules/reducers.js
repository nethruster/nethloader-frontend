import {combineReducers} from 'redux'

import authentication from 'reducers/authentication'
import {userData, userMedia} from 'reducers/data'
import {mediaUpload, mediaInfo, mediaDelete, mediaSelect} from 'reducers/media'
import html5video from 'reducers/html5video'
import toast from 'reducers/toast'
import settings from 'reducers/settings'

const reducers = combineReducers({
  authentication,
  userData,
  userMedia,
  mediaUpload,
  mediaInfo,
  mediaDelete,
  mediaSelect,
  html5video,
  toast,
  settings
})

export default reducers

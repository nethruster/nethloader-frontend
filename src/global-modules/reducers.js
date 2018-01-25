import {combineReducers} from 'redux'
import {snackbarReducer} from 'react-redux-snackbar'

import authentication from 'reducers/authentication'
import {userData, userMedia} from 'reducers/data'
import {mediaUpload, mediaInfo, mediaDelete, mediaSelect} from 'reducers/media'
import html5video from 'reducers/html5video'
import settings from 'reducers/settings'
import {media, users, userSelect, toggleIsAdmin, adminMediaSelect} from 'reducers/admin-settings'

const reducers = combineReducers({
  authentication,
  userData,
  userMedia,
  mediaUpload,
  mediaInfo,
  mediaDelete,
  mediaSelect,
  html5video,
  settings,
  media,
  users,
  userSelect,
  toggleIsAdmin,
  adminMediaSelect,
  snackbar: snackbarReducer
})

export default reducers

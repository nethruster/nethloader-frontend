import appConstants from '../constants'

// Auth reducer
const html5video = (state = {
  isPlaying: false,
  volume: 50,
  showControls: false
}, action) => {
  switch (action.type) {
    case appConstants.CHANGE_VOLUME:
      return Object.assign({}, state, {
        volume: action.volume
      })
    case appConstants.TOGGLE_CONTROLS:
      return Object.assign({}, state, {
        showControls: !state.showControls
      })
    case appConstants.TOGGLE_PLAYBACK:
      return Object.assign({}, state, {
        isPlaying: !state.isPlaying
      })
    default:
      return state
  }
}

export default html5video

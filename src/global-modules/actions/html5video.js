import appConstants from '../constants'

const togglePlayback = (isPlaying) => {
  return {
    type: appConstants.TOGGLE_PLAYBACK,
    isPlaying: !isPlaying
  }
}

const toggleControls = (showControls) => {
  return {
    type: appConstants.TOGGLE_CONTROLS,
    showControls: !showControls
  }
}

const changeVolume = (newVolume) => {
  return {
    type: appConstants.CHANGE_VOLUME,
    volume: newVolume
  }
}

export {
  togglePlayback,
  toggleControls,
  changeVolume
}

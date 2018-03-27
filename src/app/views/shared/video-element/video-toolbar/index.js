
import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import { toggleControls } from 'actions/html5video'

import Button from '../../button'

const viewStrings = locale.media_view.toolbar // eslint-disable-line no-undef

const mapStateToProps = (state) => {
  const { showControls, isTouchDevice } = state.html5video

  return {
    showControls,
    isTouchDevice
  }
}

export default connect(mapStateToProps)(class VideoElement extends Component {
  constructor (props) {
    super(props)

    this.toggleVideoControls = this.toggleVideoControls.bind(this)
  }

  toggleVideoControls () {
    this.props.dispatch(toggleControls(this.props.showControls))
  }

  render ({ showControls, isTouchDevice }) {
    if (isTouchDevice) return {}
    return (
      <a
        title={
          showControls
            ? viewStrings.hide_controls
            : viewStrings.show_controls
        }
        onClick={this.toggleVideoControls}>
        <Button
          iconButton
          icon={
            showControls
              ? 'play-pause'
              : 'ray-end'
          }
        />
      </a>
    )
  }
})

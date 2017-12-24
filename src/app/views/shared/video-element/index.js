import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import {togglePlayback} from 'actions/html5video'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {isPlaying, showControls, isTouchDevice} = state.html5video

  return {
    isPlaying,
    showControls,
    isTouchDevice
  }
}

export default connect(mapStateToProps)(class VideoElement extends Component {
  constructor (props) {
    super(props)

    this.video = null

    this.handleVideoMouseOut = this.handleVideoMouseOut.bind(this)
    this.handleVideoMouseOver = this.handleVideoMouseOver.bind(this)
    this.togglePlayback = this.togglePlayback.bind(this)
    this.evalCustomControls = this.evalCustomControls.bind(this)
    this.evalVideoControls = this.evalVideoControls.bind(this)
  }

  componentDidMount () {
    this.forceUpdate() // Making sure that media is updated
  }

  componentWillUnmount () {
    /* Make sure video state is reset before navigating away
    * The playback state is the same for the whole app (redux), hence the need to reset it if
    * it wasn't paused manually
    */
    if (this.props.isPlaying) {
      this.props.dispatch(togglePlayback(this.video, this.props.isPlaying))
    }
  }

  togglePlayback () {
    if (this.props.willPlayback) {
      this.video.paused && !this.props.isPlaying
        ? this.video.play()
        : this.video.pause()
      this.props.dispatch(togglePlayback(this.video, this.props.isPlaying))
    }
  }

  handleVideoMouseOver (event) {
    event.target.classList.add(style.videoContainerHover)
  }

  handleVideoMouseOut (event) {
    event.target.classList.remove(style.videoContainerHover)
  }

  evalCustomControls () {
    if (this.props.willPlayback) {
      return !this.props.isTouchDevice && !this.props.showControls
    }
    return false
  }

  evalVideoControls () {
    if (this.props.willPlayback) {
      return this.props.isTouchDevice || this.props.showControls
    }
    return false
  }

  render ({
    src,
    height,
    type,
    id,
    isPlaying,
    willPlayback,
    showControls,
    isTouchDevice
  }) {
    return (
      <div
        class={
          `flex flex-full-center ${ // See button shared component as to why I break this computed classes like this
            this.evalCustomControls() ? style.videoContainer : ''} ${
            (isPlaying || (this.video && !this.video.paused)) && !showControls ? style.videoContainerPlaying : ''}`
        }
        role='button'
        onMouseLeave={this.handleVideoMouseOut}
        onMouseOver={this.handleVideoMouseOver}
        onClick={this.togglePlayback}>
        <video preload='auto'
          loop
          tabindex='0'
          key={src}
          id={id}
          height={height}
          controls={this.evalVideoControls()}
          ref={(el) => { this.video = el }}>
          <source src={src} type={`video/${type}`} />
        </video>
      </div>
    )
  }
})

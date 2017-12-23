import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import {togglePlayback} from 'actions/html5video'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {isPlaying, showControls} = state.html5video

  return {
    isPlaying,
    showControls
  }
}

export default connect(mapStateToProps)(class VideoElement extends Component {
  constructor (props) {
    super(props)

    this.video = null

    this.handleVideoMouseOut = this.handleVideoMouseOut.bind(this)
    this.handleVideoMouseOver = this.handleVideoMouseOver.bind(this)
    this.togglePlayback = this.togglePlayback.bind(this)
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
      this.props.dispatch(togglePlayback(this.video, this.props.isPlaying))
    }
  }

  handleVideoMouseOver (event) {
    event.target.classList.add(style.videoContainerHover)
  }

  handleVideoMouseOut (event) {
    event.target.classList.remove(style.videoContainerHover)
  }

  render ({
    src,
    height,
    type,
    id,
    isPlaying,
    willPlayback,
    showControls
  }) {
    return (
      <div
        class={
          `flex flex-full-center ${ // See button shared component as to why I break this computed classes like this
            willPlayback && !showControls ? style.videoContainer : ''} ${
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
          controls={showControls}
          ref={(el) => { this.video = el }}>
          <source src={src} type={`video/${type}`} />
        </video>
      </div>
    )
  }
})

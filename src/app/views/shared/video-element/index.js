import {h, Component} from 'preact'

import style from './styles.scss'

export default class VideoElement extends Component {
  constructor (props) {
    super(props)

    this.video = null

    this.state = {
      isPlaying: false
    }

    this.togglePlayingState = this.togglePlayingState.bind(this)
  }

  componentDidMount () {
    this.forceUpdate()
  }

  togglePlayingState () {
    if (this.props.controls) {
      this.state.isPlaying ? this.video.pause() : this.video.play()
      this.setState({ isPlaying: !this.video.paused })
    }
  }

  handleVideoMouseOver (event) {
    event.target.classList.add(style.videoContainerHover)
  }

  handleVideoMouseOut (event) {
    event.target.classList.remove(style.videoContainerHover)
  }

  render ({src, height, type, id}) {
    return (
      <div class={`flex flex-full-center ${this.props.controls ? style.videoContainer : ''} ${this.state.isPlaying ? style.videoContainerPlaying : ''}`} role='button' onMouseLeave={this.handleVideoMouseOut} onMouseOver={this.handleVideoMouseOver} onClick={this.togglePlayingState}>
        <video preload='auto' loop tabindex='0' key={src} id={id} ref={(el) => { this.video = el }} height={height}>
          <source src={src} type={`video/${type}`} />
        </video>
      </div>
    )
  }
}

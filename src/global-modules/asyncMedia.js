import { h, Component } from 'preact'

import ViewLoading from '../app/views/shared/view-loading/view-loading.js'

const supportedVideoFormats = ['mp4', 'webm', 'ogg']

export default class AsyncMedia extends Component {
  constructor (props) {
    super(props)

    this.state = {isLoaded: false}
  }

  isVideoFormat () {
    return supportedVideoFormats.includes(this.props.type)
  }

  componentWillMount () {
    if (!this.state.isLoaded && !this.isVideoFormat()) {
      let tempImgComponent = new Image()
      tempImgComponent.src = this.props.src
      tempImgComponent.onload = () => {
        this.setState({isLoaded: true})
      }

      tempImgComponent.remove()
    } else {
      this.setState({ isLoaded: true })
    }
  }

  render () {
    return this.state.isLoaded ? (this.isVideoFormat() ? <video preload='metadata' controlsList='nodownload' height={this.props.size} controls={this.props.controls} data-mediaId={this.props.id}><source src={this.props.src} type={`video/${this.props.type}`} /></video> : <img src={this.props.src} />) : <ViewLoading />
  }
}

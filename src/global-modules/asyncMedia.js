import { h, Component } from 'preact'

import ViewLoading from '../app/views/shared/view-loading/view-loading.js'

const supportedVideoFormats = ['mp4', 'webm', 'ogg']

export default class AsyncMedia extends Component {
  constructor (props) {
    super(props)

    this.state = {mediaNode: null}
  }

  isVideoFormat () {
    return supportedVideoFormats.includes(this.props.type)
  }

  componentWillMount () {
    if (!this.state.mediaNode && !this.isVideoFormat()) {
      let tempImgComponent = new Image()
      tempImgComponent.src = this.props.src

      tempImgComponent.onload = () => {
        let mediaNode = <img src={this.props.src} />

        this.setState({mediaNode})

        tempImgComponent.remove()
      }
    } else {
      let tempVideoComponent = document.createElement('video')
      let tempSourceElement = document.createElement('source')
      tempSourceElement.src = this.props.src
      tempSourceElement.type = `video/${this.props.type}`
      tempVideoComponent.appendChild(tempSourceElement)

      tempVideoComponent.oncanplay = () => {
        let mediaNode =
        (<video preload='metadata' controlsList='nodownload' height={this.props.size} controls={this.props.controls}>
          <source src={this.props.src} type={`video/${this.props.type}`} />
        </video>)

        this.setState({ mediaNode })

        tempSourceElement.remove()
        tempVideoComponent.remove()
      }
    }
  }

  render () {
    return this.state.mediaNode ? this.state.mediaNode : <ViewLoading />
  }
}

import {h, Component} from 'preact'

import ViewLoading from '../app/views/shared/view-loading'

import {isValidVideoFormat} from 'utils'

export default class AsyncMedia extends Component {
  constructor (props) {
    super(props)

    this.state = {mediaNode: null}
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.state.mediaNode !== nextState.mediaNode
  }

  async componentWillMount () {
    if (!this.state.mediaNode) {
      if (isValidVideoFormat(`video/${this.props.type}`)) {
        const tempVideoElement = document.createElement('video')
        const tempSourceElement = document.createElement('source')
        tempSourceElement.src = this.props.src
        tempSourceElement.type = `video/${this.props.type}`
        tempVideoElement.appendChild(tempSourceElement)

        tempVideoElement.oncanplay = () => {
          // If we get controls prop true, it means that we are on media-view, we won't play the video on the overview panel
          const mediaNode =
            (<video preload={this.props.controls ? 'auto' : 'metadata'} height={this.props.size} controls={this.props.controls}>
              <source src={this.props.src} type={`video/${this.props.type}`} />
            </video>)

          this.setState({mediaNode})

          tempSourceElement.remove()
          tempVideoElement.remove()
        }
      } else {
        const tempImgElement = new Image()
        tempImgElement.src = this.props.src

        tempImgElement.onload = () => {
          const mediaNode = <img src={this.props.src} height={tempImgElement.height} width={tempImgElement.width} alt={`${this.props.type} ${this.props.src}`} />

          this.setState({mediaNode})

          tempImgElement.remove()
        }
      }
    }
  }

  render () {
    return this.state.mediaNode ? this.state.mediaNode : <ViewLoading />
  }
}

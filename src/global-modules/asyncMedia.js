import {h, Component} from 'preact'

import ViewLoading from '../app/views/shared/view-loading'

import {isValidVideoFormat, unprocessableExtensions} from 'utils'
import {baseMediaPath} from 'app.config'

export default class AsyncMedia extends Component {
  constructor (props) {
    super(props)

    this.state = {mediaNode: null}

    this.computeMediaSrc = this.computeMediaSrc.bind(this)
    this.hasThumbnail = this.hasThumbnail.bind(this)
  }

  hasThumbnail () {
    return !unprocessableExtensions.includes(this.props.type)
  }

  computeMediaSrc () {
    if (this.props.thumbnail && this.hasThumbnail()) {
      return `${baseMediaPath}${this.props.id}_thumb.jpg`
    }
    return `${baseMediaPath}${this.props.id}.${this.props.type}`
  }

  componentDidMount () {
    if (!this.state.mediaNode) {
      let mediaSrc = this.computeMediaSrc()

      if ((!this.props.thumbnail && isValidVideoFormat(this.props.type)) || (this.props.thumbnail && !this.hasThumbnail() && isValidVideoFormat(this.props.type))) {
        let tempVideoElement = document.createElement('video')
        let tempSourceElement = document.createElement('source')
        tempSourceElement.src = mediaSrc
        tempSourceElement.type = `video/${this.props.type}`
        tempVideoElement.appendChild(tempSourceElement)

        tempVideoElement.oncanplay = () => {
          let mediaNode =
            (<video preload='auto' height={this.props.size} controls={this.props.controls}>
              <source src={mediaSrc} type={`video/${this.props.type}`} />
            </video>)

          this.setState({mediaNode})

          tempSourceElement.remove()
          tempVideoElement.remove()
        }
      } else {
        let tempImgElement = new Image()
        tempImgElement.src = mediaSrc

        tempImgElement.onload = () => {
          let mediaNode = <img src={mediaSrc} height={tempImgElement.height} width={tempImgElement.width} alt={`${this.props.type} ${mediaSrc}`} />

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

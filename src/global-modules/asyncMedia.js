import {h, Component} from 'preact'

import ViewLoading from '../app/views/shared/view-loading'

import {isValidVideoFormat} from 'utils'
import {baseMediaPath} from 'app.config'

export default class AsyncMedia extends Component {
  constructor (props) {
    super(props)

    this.state = {mediaNode: null}
  }

  componentDidMount () {
    if (!this.state.mediaNode) {
      let mediaSrc = `${baseMediaPath}${this.props.id}.${this.props.type}`

      if (isValidVideoFormat(`video/${this.props.type}`)) {
        let tempVideoElement = document.createElement('video')
        let tempSourceElement = document.createElement('source')
        tempSourceElement.src = mediaSrc
        tempSourceElement.type = `video/${this.props.type}`
        tempVideoElement.appendChild(tempSourceElement)

        tempVideoElement.oncanplay = () => {
          // If we get controls prop true, it means that we are on media-view, we won't play the video on the overview panel
          let mediaNode =
            (<video preload={this.props.controls ? 'auto' : 'metadata'} height={this.props.size} controls={this.props.controls}>
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

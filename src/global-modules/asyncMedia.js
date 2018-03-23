import {h, Component} from 'preact'
import {connect} from 'preact-redux'

import ViewLoading from '../app/views/shared/view-loading'
import VideoElement from '../app/views/shared/video-element'
import {isValidVideoFormat, unprocessableExtensions} from 'utils'

function mapStateToProps (state) {
  const {mediaInfo, isFetching} = state.mediaInfo
  const {sessionData} = state.authentication

  return {
    mediaInfo,
    isFetching,
    sessionData
  }
}

export default connect(mapStateToProps)(class AsyncMedia extends Component {
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
    let userId = this.props.mediaInfo ? this.props.mediaInfo.user.id : ssrData.userId // eslint-disable-line no-undef
    if (this.props.thumbnail && this.hasThumbnail()) {
      return `${baseMediaPath}${userId}/${this.props.id}_thumb.jpg` // eslint-disable-line no-undef
    }
    return `${baseMediaPath}${userId}/${this.props.id}.${this.props.type}` // eslint-disable-line no-undef
  }

  componentDidMount () {
    if (!this.state.mediaNode) {
      let mediaSrc = this.computeMediaSrc()

      if (
        (
          !this.props.thumbnail &&
          this.props.type !== 'gif' &&
          isValidVideoFormat(this.props.type)
        ) ||
        (
          this.props.thumbnail &&
          !this.hasThumbnail() &&
          isValidVideoFormat(this.props.type)
        )
      ) {
        let tempVideoElement = document.createElement('video')
        let tempSourceElement = document.createElement('source')
        tempSourceElement.src = mediaSrc
        tempSourceElement.type = `video/${this.props.type}`
        tempVideoElement.appendChild(tempSourceElement)

        tempVideoElement.oncanplay = () => {
          let mediaNode = (
            <VideoElement
              src={mediaSrc}
              height={this.props.size}
              type={this.props.type}
              willPlayback={this.props.willPlayback && !this.props.thumbnail}
            />
          )

          tempVideoElement.onabort = (event) => {
            console.log('asyncMedia - video abort: ' + event)
          }

          tempVideoElement.onerror = (event) => {
            console.log('asyncMedia - video error: ' + event)
          }

          this.setState({mediaNode})

          tempSourceElement.remove()
          tempVideoElement.remove()
        }
      } else {
        let tempImgElement = new Image()
        tempImgElement.src = mediaSrc

        tempImgElement.onload = () => {
          // For svgs to have size
          let elementHeight = tempImgElement.height <= 0
            ? 'auto'
            : tempImgElement.height
          let elementWidth = tempImgElement.width <= 0
            ? '500'
            : tempImgElement.width
          let mediaNode = (
            <img
              src={mediaSrc}
              height={elementHeight}
              width={elementWidth}
              onClick={this.props.onClickExecute || ''}
              alt={`${this.props.type} ${mediaSrc}`}
            />
          )

          tempImgElement.onabort = (event) => {
            console.log('asyncMedia - image abort: ' + event)
          }

          tempImgElement.onerror = (event) => {
            console.log('asyncMedia - image error: ' + event)
          }

          this.setState({mediaNode})
          
          tempImgElement.remove()
        }
      }
    }
  }

  render () {
    return this.state.mediaNode
      ? this.state.mediaNode
      : <ViewLoading />
  }
})

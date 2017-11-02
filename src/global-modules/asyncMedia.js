import { h, Component } from 'preact'

import ViewLoading from '../app/views/shared/view-loading/view-loading.js'

import { isValidVideoFormat } from 'utils'

export default class AsyncMedia extends Component {
  constructor (props) {
    super(props)

    this.state = {mediaNode: null}
  }

  componentWillMount () {
    if (!this.state.mediaNode) {
      if (isValidVideoFormat(`video/${this.props.type}`)) {
        let tempVideoComponent = document.createElement('video')
        let tempSourceElement = document.createElement('source')
        tempSourceElement.src = this.props.src
        tempSourceElement.type = `video/${this.props.type}`
        tempVideoComponent.appendChild(tempSourceElement)

        tempVideoComponent.onloadeddata = () => {
          let mediaNode =
            (<video preload='metadata' height={this.props.size} controls={this.props.controls}>
              <source src={this.props.src} type={`video/${this.props.type}`} />
            </video>)

          this.setState({ mediaNode })

          tempSourceElement.remove()
          tempVideoComponent.remove()
        }
      } else {
        let tempImgComponent = new Image()
        tempImgComponent.src = this.props.src

        tempImgComponent.onload = () => {
          let mediaNode = <img src={this.props.src} />

          this.setState({ mediaNode })

          tempImgComponent.remove()
        }
      }
    }
  }

  render () {
    return this.state.mediaNode ? this.state.mediaNode : <ViewLoading />
  }
}

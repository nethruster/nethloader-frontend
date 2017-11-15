import { h, Component } from 'preact'

import ViewLoading from '../app/views/shared/view-loading'

import { isValidVideoFormat } from 'utils'

export default class AsyncMedia extends Component {
  constructor (props) {
    super(props)

    this.state = {mediaNode: null}
  }

  componentWillMount () {
    if (!this.state.mediaNode) {
      if (isValidVideoFormat(`video/${this.props.type}`)) {
        const tempVideoComponent = document.createElement('video')
        const tempSourceElement = document.createElement('source')
        tempSourceElement.src = this.props.src
        tempSourceElement.type = `video/${this.props.type}`
        tempVideoComponent.appendChild(tempSourceElement)

        tempVideoComponent.onloadeddata = () => {
          const mediaNode =
            (<video preload='auto' height={this.props.size} controls={this.props.controls}>
              <source src={this.props.src} type={`video/${this.props.type}`} />
            </video>)

          this.setState({ mediaNode })

          tempSourceElement.remove()
          tempVideoComponent.remove()
        }
      } else {
        const tempImgComponent = new Image()
        tempImgComponent.src = this.props.src

        tempImgComponent.onload = () => {
          const mediaNode = <img src={this.props.src} alt={`${this.props.type} ${this.props.src}`} />

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

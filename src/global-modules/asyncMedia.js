import { h, Component } from 'preact'

import ViewLoading from '../app/views/shared/view-loading/view-loading.js'

export default class AsyncMedia extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoaded: false
    }
  }

  componentWillMount () {
    if (!this.state.isLoaded) {
      let tempImgComponent = new Image()
      tempImgComponent.src = this.props.src

      tempImgComponent.onload = () => {
        this.setState({ isLoaded: true })
      }
    }
  }

  render () {
    return this.state.isLoaded ? <img src={this.props.src} /> : <ViewLoading />
  }
}

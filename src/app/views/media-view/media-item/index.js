import {h, Component} from 'preact'
import Icon from '../../shared/icon'

import AsyncMedia from 'asyncMedia'

import style from './styles.scss'

export default class MediaItem extends Component {
  constructor (props) {
    super(props)

    this.state = {isZoomed: false}

    this.toggleZoom = this.toggleZoom.bind(this)
  }

  toggleZoom () {
    if (!this.state.isZoomed) {
      document.body.style.overflowY = 'hidden'
      this.setState({isZoomed: true})
    } else {
      this.setState({ isZoomed: false })
      document.body.style.overflowY = 'initial'
    }
  }

  render ({type, id, isFetching}) {
    return (
      <div class={`${style.mediaItem} ${this.state.isZoomed ? style.zoomed : ''}`}>
        <div onClick={this.toggleZoom} class={`${style.closeButton}`}>
          <span class='flex flex-full-center'><Icon iconName='close' /></span>
        </div>
        
        {
          !isFetching && type && id &&
          <div class={this.state.isZoomed ? style.zoomedMediaContainer : ''}>
            <AsyncMedia onClickExecute={this.toggleZoom} type={type} id={id} willPlayback />
          </div>
        }
      </div>
    )
  }
}

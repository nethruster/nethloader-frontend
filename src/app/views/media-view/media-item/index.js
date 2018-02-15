import {h, Component} from 'preact'
import Icon from '../../shared/icon'

import AsyncMedia from 'asyncMedia'

import style from './styles.scss'

export default class MediaItem extends Component {
  constructor (props) {
    super(props)

    this.state = {isZoomed: false}

    this.openZoom = this.openZoom.bind(this)
    this.closeZoom = this.closeZoom.bind(this)
  }

  openZoom () {
    if (!this.state.isZoomed) {
      document.body.style.overflowY = 'hidden'
      this.setState({isZoomed: true})
    }
  }

  closeZoom () {
    if (this.state.isZoomed) {
      this.setState({isZoomed: false})
      document.body.style.overflowY = 'initial'
    }
  }

  render ({type, id, isFetching}) {
    require('dragscroll')
    return (
      <div class={`${style.mediaItem} ${this.state.isZoomed ? style.zoomed : ''} dragscroll`}>
        <div onClick={this.closeZoom} class={`${style.closeButton}`}>
          <span class='flex flex-full-center'><Icon iconName='close' /></span>
        </div>
        
        {!isFetching && type && id && <AsyncMedia onClickExecute={this.openZoom} type={type} id={id} willPlayback />}
      </div>
    )
  }
}

import { h, Component } from 'preact'

import AsyncMedia from 'asyncMedia'

import style from './media-item.scss'

export default class MediaItem extends Component {
  render () {
    return (
      <div class={`${style.mediaItem}`}>
        <AsyncMedia src={this.props.mediaSrc} type={this.props.type} id={this.props.id} controls />
      </div>
    )
  }
}

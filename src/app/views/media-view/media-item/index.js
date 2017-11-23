import {h, Component} from 'preact'

import AsyncMedia from 'asyncMedia'

import style from './styles.scss'

export default class MediaItem extends Component {
  render ({mediaSrc, type, id}) {
    return (
      <div class={`${style.mediaItem}`}>
        <AsyncMedia src={mediaSrc} type={type} id={id} controls />
      </div>
    )
  }
}

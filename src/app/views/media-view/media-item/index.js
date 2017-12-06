import {h} from 'preact'

import AsyncMedia from 'asyncMedia'

import style from './styles.scss'

export default function MediaItem ({type, id}) {
  return (
    <div class={`${style.mediaItem}`}>
      <AsyncMedia type={type} id={id} controls />
    </div>
  )
}

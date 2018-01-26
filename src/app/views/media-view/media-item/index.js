import {h} from 'preact'

import AsyncMedia from 'asyncMedia'

import style from './styles.scss'

export default function MediaItem ({type, id, isFetching}) {
  return (
    <div class={`${style.mediaItem}`}>
      {!isFetching && type && id && <AsyncMedia type={type} id={id} willPlayback />}
    </div>
  )
}

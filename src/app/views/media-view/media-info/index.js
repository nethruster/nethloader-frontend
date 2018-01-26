import {h} from 'preact'

import MediaInfoButtons from './buttons'
import MediaInfoData from './info'

import style from './styles.scss'

export default function MediaInfo ({createdAt, mediaSrc, mediaUrl}) {
  return (
    <div class={`${style.mediaInfo} flex flex-cross-center`}>
      <MediaInfoData createdAt={createdAt} />
      <MediaInfoButtons mediaSrc={mediaSrc} mediaUrl={mediaUrl} />
    </div>
  )
}

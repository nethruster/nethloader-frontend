import { h } from 'preact'

import MediaInfoButtons from './buttons'
import MediaInfoData from './info'

import style from './styles.scss'

export default function MediaInfo ({ mediaData }) {
  return (
    <div class={`${style.mediaInfo} flex flex-cross-center`}>
      <MediaInfoData createdAt={mediaData.createdAt} />
      <MediaInfoButtons mediaData={mediaData} />
    </div>
  )
}

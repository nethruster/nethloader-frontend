import {h} from 'preact'

import Button from '../../shared/button'
import Icon from '../../shared/icon'
import VideoToolbar from '../../shared/video-element/video-toolbar'
import {computeDateFormat, computeDate, computeTime, isValidVideoFormat} from 'utils'
import {baseMediaPath} from 'app.config'

import style from './styles.scss'
import '../../shared/paper/paper.scss'

import locale from 'locale'
const viewStrings = locale.media_view.buttons

export default function MediaInfo ({data}) {
  const mediaSrc = `${baseMediaPath}${data.id}.${data.extension}`
  const mediaUrl = `${document.location.origin}/${data.id}`

  return (
    <div class={`${style.mediaInfo} flex flex-cross-center`}>
      <div title={computeDateFormat(data.createdAt)} class='flex flex-cross-center'>
        <p class={style.mediaInfoDate}>
          <Icon iconName='calendar-clock' />&nbsp;{computeDate(data.createdAt)} - {computeTime(data.createdAt)}
        </p>
      </div>
      <div class='flex flex-cross-center'>
        <a href={mediaSrc} download={data.id} rel='noopener' title={viewStrings.download}>
          <Button iconButton icon='download' />
        </a>
        <a href={mediaSrc} target='_blank' rel='noopener' title={viewStrings.view_original}>
          <Button iconButton icon='open-in-new' />
        </a>
        {
          isValidVideoFormat(data.extension) && data.extension !== 'gif' && <VideoToolbar /> // If the element is a video, show video tools
        }
      </div>
      <div class='flex flex-cross-center'>
        <a class={`${style.shareButton} ${style.twitter}`}
          title='Share on Twitter'
          rel='noopener'
          target='_blank'
          href={`https://twitter.com/intent/tweet?url=${mediaUrl};text=Uploaded media via Nethloader;related=nethruster,gariasf,claudio4`}>
          <Icon iconName='twitter' />
        </a>
        <a
          class={style.facebook}
          title='Share on Facebook'
          href={`http://www.facebook.com/sharer/sharer.php?u=${mediaUrl}&display=popup`}>
          <Icon iconName='facebook' />
        </a>
      </div>
    </div>
  )
}

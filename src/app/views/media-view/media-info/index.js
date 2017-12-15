import {h} from 'preact'

import Button from '../../shared/button'
import Icon from '../../shared/icon'

import {computeDateFormat, computeDate, computeTime} from 'utils'
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
      <div title={computeDateFormat(data.createdAt)}>
        <p><Icon iconName='calendar-clock' />&nbsp;{computeDate(data.createdAt)} - {computeTime(data.createdAt)}</p>
      </div>
      <div class='flex'>
        <a href={mediaSrc} download rel='noopener' title={viewStrings.download}><Button iconButton icon='download' /></a>
        <a href={mediaSrc} target='_blank' rel='noopener' title={viewStrings.view_original}><Button iconButton icon='fullscreen' /></a>
      </div>
      <div class='flex'>
        <a class={`${style.shareButton} ${style.twitter}`} title='Twitter' rel='noopener' target='_blank'
          href={`https://twitter.com/intent/tweet?url=${mediaUrl};text=${data.extension}media;related=Nethruster`}>
          <Icon iconName='twitter' /></a>
        <a class={style.facebook} title='Facebook' href={`http://www.facebook.com/dialog/share?app_id=732538520272338&amp;href=${mediaUrl}&amp;display=popup`}><Icon iconName='facebook' /></a>
      </div>
    </div>
  )
}

import {h} from 'preact'

import Button from '../../shared/button'

import locale from 'locale'
import {computeDateFormat, computeDate, computeTime} from 'utils'
import {baseMediaPath} from 'app.config'

import style from './styles.scss'
import '../../shared/paper/paper.scss'

const viewStrings = locale.media_view.info

export default function MediaInfo ({data}) {
  const mediaSrc = `${baseMediaPath}${data.id}.${data.extension}`
  return (
    <div class={`paper paper-small paper-transparent ${style.mediaInfo} flex flex-dc`}>
      <div class={`${style.mediaInfoButtons} flex flex-sa`}>
        <a href={mediaSrc} target='_blank' rel='noopener' title='Open original image in a new tab'><Button text={viewStrings.buttons.view_original} small tabindex='-1' icon='fullscreen' /></a>
        <a href={mediaSrc} download rel='noopener' title='Download image'><Button text={viewStrings.buttons.download} small tabindex='-1' icon='download' /></a>
      </div>
      <div class='flex flex-full-center'>
        <div class={`${style.dataSpec} flex flex-dc`}><p><span>ID:</span> {data.id}</p> <p><span>{viewStrings.type}:</span> {data.extension}</p></div>
        <div class={`${style.dataDate} flex flex-dc`} title={computeDateFormat(data.createdAt)}><p><span>{viewStrings.uploaded}:</span> {computeDate(data.createdAt)}</p> <p><span>{viewStrings.at}:</span> {computeTime(data.createdAt)}</p></div>
      </div>
    </div>
  )
}

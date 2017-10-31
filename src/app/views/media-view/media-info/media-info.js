import { h, Component } from 'preact'

import { computeDateFormat, computeDate, computeTime } from 'utils'

import Button from '../../shared/button/button.js'

import style from './media-info.scss'
import '../../shared/paper/paper.scss'

import locale from 'locale'

const viewStrings = locale.media_view

export default class MediaInfo extends Component {
  render () {
    return (
      <div class={`paper paper-small ${style.mediaInfo} flex flex-dc`}>
        <div class={`${style.mediaInfoButtons} flex flex-sa`}>
          <a href={this.props.mediaSrc} target='_blank' rel='noopener' title='Open original image in a new tab'><Button text={viewStrings.buttons.view_original} small tabindex='-1' icon='fullscreen' /></a>
          <a href={this.props.mediaSrc} download rel='noopener' title='Download image'><Button text={viewStrings.buttons.download} small tabindex='-1' icon='download' /></a>
        </div>
        <div class='flex flex-full-center'>
          <div class={`${style.dataSpec} flex flex-dc`}><p><span>ID:</span> {this.props.data.id}</p> <p><span>Type:</span> {this.props.data.extension}</p></div>
          <div class={`${style.dataDate} flex flex-dc`} title={computeDateFormat(this.props.data.createdAt)}><p><span>Uploaded:</span> {computeDate(this.props.data.createdAt)}</p> <p><span>At:</span> {computeTime(this.props.data.createdAt)}</p></div>
        </div>
      </div>
    )
  }
}

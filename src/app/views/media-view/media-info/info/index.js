import {h} from 'preact'

import Icon from '../../../shared/icon'
import {computeDateFormat, computeDate, computeTime} from 'utils'

import style from './styles.scss'

export default function MediaInfoData ({createdAt}) {
  return (
    <div title={computeDateFormat(createdAt)} class={`flex flex-full-center ${style.data}`}>
      <p class={style.mediaInfoDate}>
        <Icon iconName='calendar-clock' />&nbsp;{computeDate(createdAt)} - {computeTime(createdAt)}
      </p>
    </div>
  )
}

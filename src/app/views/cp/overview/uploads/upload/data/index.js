import { h } from 'preact'

import { computeDateFormat, computeDate, computeTime } from 'utils'

import style from './styles.scss'

const viewStrings = locale.cp.overview.uploads.upload // eslint-disable-line no-undef

export default function UploadData ({ data }) {
  return (
    <div class={`${style.data} flex flex-cross-center flex-sa`}>
      <div class={`${style.dataSpec} flex flex-dc`}>
        <p><span>ID:</span> {data.id}</p>
        <p><span>{viewStrings.type}:</span> {data.extension}</p>
      </div>

      <div class={`${style.dataDate} flex flex-dc`} title={computeDateFormat(data.createdAt)}>
        <small>{computeDateFormat(data.createdAt)}</small>
        <p><span>{viewStrings.uploaded}:</span> {computeDate(data.createdAt)}<br />{computeTime(data.createdAt)}</p>
      </div>
    </div>
  )
}

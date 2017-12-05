import {h} from 'preact'
import {Link} from 'react-router-dom'

import UploadData from './data'
import UploadButtons from './buttons'
import AsyncMedia from 'asyncMedia'

import {baseMediaPath} from 'app.config'

import style from './styles.scss'

export default function Upload ({data, isSelected, handleToggleSelect, toggleDeleteConfirmModal}) {
  const mediaPath = `${baseMediaPath}${data.id}.${data.extension}`
  const mediaUrl = `${document.location.origin}/${data.id}`

  return (
    <li class={`${style.upload} flex flex-cross-center flex-sb`}>
      <Link to={`/${data.id}`} class={`${style.uploadDataLink} flex`}>
        <div class={`${style.uploadMedia} flex flex-full-center`}>
          <AsyncMedia src={mediaPath} type={data.extension} size='74' id={data.id} />
        </div>
        <UploadData data={data} />
      </Link>

      <UploadButtons data={data} mediaPath={mediaPath} mediaUrl={mediaUrl} toggleDeleteConfirmModal={toggleDeleteConfirmModal} handleToggleSelect={handleToggleSelect} />
    </li>
  )
}

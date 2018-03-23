import {h} from 'preact'
import {Link} from 'react-router-dom'

import UploadData from './data'
import UploadButtons from './buttons'
import AsyncMedia from 'asyncMedia'

import style from './styles.scss'

export default function Upload ({data, user, isSelected, handleToggleSelect, toggleDeleteConfirmModal}) {
  return (
    <li class={`${style.upload} flex flex-cross-center flex-sb`}>
      <Link to={`/${data.id}`} class={`${style.uploadDataLink} flex`}>
        <div class={`${style.uploadMedia} flex flex-full-center`}>
          <AsyncMedia
            mediaInfo={data}
            user={user}
            thumbnail
          />
        </div>
        <UploadData data={data} />
      </Link>

      <UploadButtons
        data={data}
        toggleDeleteConfirmModal={toggleDeleteConfirmModal}
        handleToggleSelect={handleToggleSelect}
      />
    </li>
  )
}

import {h} from 'preact'
import {Link} from 'react-router-dom'

import UploadData from './data'
import UploadButtons from './buttons'
import AsyncMedia from 'asyncMedia'

import style from './styles.scss'

export default function Upload ({data, isSelected, handleToggleSelect, toggleDeleteConfirmModal}) {
  return (
    <li class={`${style.upload} flex flex-cross-center flex-sb`}>
      <Link to={`/${data.id}`} class={`${style.uploadDataLink} flex`}>
        <div class={`${style.uploadMedia} flex flex-full-center`}>
          <AsyncMedia type={data.extension} thumbnail id={data.id} />
        </div>
        <UploadData data={data} />
      </Link>

      <UploadButtons data={data} toggleDeleteConfirmModal={toggleDeleteConfirmModal} handleToggleSelect={handleToggleSelect} />
    </li>
  )
}

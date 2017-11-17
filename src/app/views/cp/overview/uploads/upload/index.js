import { h, Component } from 'preact'

import UploadData from './data'
import UploadButtons from './buttons'
import AsyncMedia from 'asyncMedia'

import { baseMediaPath } from 'app.config'

import style from './styles.scss'

export default class Upload extends Component {
  render ({data, isSelected, handleToggleSelect, selectMode, toggleDeleteConfirmModal}) {
    const mediaPath = `${baseMediaPath}${data.id}.${data.extension}`
    const mediaUrl = `${document.location.origin}/${data.id}`
    
    return (
      <li class={`${style.upload} flex flex-cross-center flex-sb`} ref={(el) => { this.uploadEl = el }}>
        <div class={`${style.uploadMedia} flex flex-full-center`} tabindex='-4'>
          <AsyncMedia src={mediaPath} type={data.extension} size='74' id={data.id} />
        </div>

        <UploadData data={data} />

        <UploadButtons data={data} isSelected={isSelected} selectMode={selectMode} mediaPath={mediaPath} mediaUrl={mediaUrl} toggleDeleteConfirmModal={toggleDeleteConfirmModal} handleToggleSelect={handleToggleSelect} />
      </li>
    )
  }
}

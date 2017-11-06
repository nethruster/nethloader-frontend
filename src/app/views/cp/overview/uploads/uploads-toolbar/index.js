import { h, Component } from 'preact'

import Button from '../../../../shared/button'
import Icon from '../../../../shared/icon'

import style from './styles.scss'

export default class UploadsToolbar extends Component {
  render ({isSelecting, toggleIsSelecting, deleteSelectedMedia, hasMedia}) {
    return (
      <div class={`flex ${style.uploadsToolbar}`}>
        <div class={`flex flex-cross-center flex-sb ${style.uploadsToolbarSelect}`}>
          <Button text={isSelecting ? 'Disable select' : 'Enable select'} customClass={style.uploadsToolbarButton} small contrast onClickExecute={toggleIsSelecting} disabled={!hasMedia} />
          <div class={`flex flex-cross-center flex-sb ${style.uploadsToolbarSelectButtons} ${isSelecting ? style.uploadsToolbarSelectButtonsActive : ''}`}>
            {/* <span class='flex flex-full-center'><Icon iconName='selectall' /></span> */}
            <span class='flex flex-full-center' onClick={deleteSelectedMedia}><Icon iconName='delete' iconColor='#e53935' /></span>
          </div>
        </div>
      </div>
    )
  }
}

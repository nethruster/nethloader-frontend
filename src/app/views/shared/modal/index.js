import { h, Component } from 'preact'

import Button from '../button'

import locale from 'locale'

import './styles.scss'

const viewStrings = locale.shared.modal

export default class Modal extends Component {
  render ({isActive, modalTitle, modalContent, toggleModal}) {
    return (
      <div class={`modal ${isActive ? 'active' : ''} flex flex-full-center`}>
        <div class='modal-content'>
          {modalTitle && <div class='modal-content-header'>{modalTitle}</div>}
          <div class='modal-content-body'>{modalContent}</div>
          <div class='flex modal-content-footer'>
            <Button text={viewStrings.close} icon='close' onClickExecute={toggleModal} customClass='modal-close-button' />
          </div>
        </div>
        <div class='modal-overlay' onClick={toggleModal}>{}</div>
      </div>
    )
  }
}

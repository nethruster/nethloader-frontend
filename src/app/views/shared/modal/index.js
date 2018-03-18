import {h} from 'preact'

import Button from '../button'

import './styles.scss'

const viewStrings = locale.shared.modal // eslint-disable-line no-undef
 
export default function Modal ({
  isActive,
  modalTitle,
  toggleModal,
  closeButtonText,
  acceptButtonText,
  onAcceptExecute,
  disabled,
  children,
  form
}) {
  return (
    <div
      class={`modal ${isActive ? 'active' : ''} flex flex-full-center`}
      style={{ top: Math.round(window.pageYOffset) }}>
      <div class='modal-content'>
        {
          modalTitle &&
          <div class='modal-content-header'>{modalTitle}</div>
        }
        <div class='modal-content-body'>{children}</div>
        <div class='flex modal-content-footer'>
          {
            acceptButtonText &&
            <Button
              text={acceptButtonText}
              icon='check'
              onClickExecute={onAcceptExecute}
              customClass='modal-accept-button'
              disabled={disabled}
              spinner={disabled}
              spinnerSize='14'
              tabindex='-1'
              type={form ? 'submit' : ''}
            />
          }
          <Button
            text={closeButtonText || viewStrings.close}
            icon='close'
            onClickExecute={toggleModal}
            customClass='modal-close-button'
            disabled={disabled}
            tabindex='-1'
          />
        </div>
      </div>
      <div class='modal-overlay' onClick={toggleModal} />
    </div>
  )
}

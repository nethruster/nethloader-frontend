import {h, Component} from 'preact'

import Button from '../button'

import style from './styles.scss'

const viewStrings = locale.shared.modal // eslint-disable-line no-undef
 
export default class Modal extends Component {
  componentWillReceiveProps (props) {
    if (props.isActive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.removeAttribute('style')
    }
  }
    
  render ({
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
        style={{ top: Math.round(window.pageYOffset) }}
        ref={element => { this.modal = element }}>
        <div class={`modal-content ${isActive ? style.smallHeight : ''}`}>
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
}

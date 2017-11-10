import { h, Component } from 'preact'

import Button from '../button'

import locale from 'locale'

import './styles.scss'

const viewStrings = locale.shared.modal

/* List of keys that can cause scrolling
 *
 * left: 37, up: 38, right: 39, down: 40,
 * spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
 */
let scrollKeys = { 37: 1, 38: 1, 39: 1, 40: 1 }

export default class Modal extends Component {
  constructor (props) {
    super(props)

    this.preventSroll = this.preventSroll.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    window.onwheel = null
    window.ontouchmove = null
    window.onkeydown = null
    return (this.props.isActive !== nextProps.isActive) ||
           (this.props.disabled !== nextProps.disabled) ||
            (this.props.children !== nextProps.children)
  }

  preventSroll () {
    if (this.props.isActive) {
      window.onwheel = (event) => { event.preventDefault() }
      window.ontouchmove = (event) => { event.preventDefault(); event.returnValue = false }
      window.onkeydown = (event) => {
        if (scrollKeys[event.keyCode]) {
          event.preventDefault()
          return false
        }
      }
    }
  }

  render ({isActive, modalTitle, toggleModal, closeButtonText, acceptButtonText, onAcceptExecute, disabled}) {
    return (
      <div class={`modal ${isActive ? 'active' : ''} flex flex-full-center`} style={{ top: Math.round(window.pageYOffset) }} onwheel={this.preventSroll} ontouchmove={this.preventSroll} onkeydown={this.preventSroll}>
        <div class='modal-content'>
          {modalTitle && <div class='modal-content-header'>{modalTitle}</div>}
          <div class='modal-content-body'>{this.props.children}</div>
          <div class='flex modal-content-footer'>
            {acceptButtonText && <Button text={acceptButtonText} icon='check' onClickExecute={onAcceptExecute} customClass='modal-accept-button' disabled={disabled} spinner={disabled} spinnerSize='14' tabindex='-1' />}
            <Button text={closeButtonText || viewStrings.close} icon='close' onClickExecute={toggleModal} customClass='modal-close-button' disabled={disabled} tabindex='-1' />
          </div>
        </div>
        <div class='modal-overlay' onClick={toggleModal}>{}</div>
      </div>
    )
  }
}

import { h, Component } from 'preact'

import Button from '../button/button.js'

import './modal.scss'

import locale from 'locale'

const viewStrings = locale.shared.modal

export default class Modal extends Component {
  render () {
    return (
      <div class={`modal ${this.props.isActive ? 'active' : ''} flex flex-full-center`}>
        <div class='modal-content'>
          <div class='modal-content-header'>{this.props.modalTitle}</div>
          <div class='modal-content-body'>{this.props.modalContent}</div>
          <div class='flex modal-content-footer'>
            <Button text={viewStrings.close} icon='close' onClickExecute={this.props.toggleModal} customClass='modal-close-button' />
          </div>
        </div>
        <div class='modal-overlay' onClick={this.props.toggleModal}>{}</div>
      </div>
    )
  }
}

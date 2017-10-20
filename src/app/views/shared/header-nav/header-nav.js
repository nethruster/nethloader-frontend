import { h, Component } from 'preact'

import Button from '../button/button.js'
import Modal from '../modal/modal.js'

import style from './header-nav.scss'

import locale from 'locale'

const viewStrings = locale.header_nav

export default class HeaderNav extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isActive: false
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal (event) {
    event.stopPropagation()
    this.setState({isActive: !this.state.isActive})
  }

  render () {
    const modalContent = (
      <p>
        This format <strong>allows</strong> , use of <sup>html passed as prop</sup>
      </p>
      )
    return (
      <header class={`${style.headerNav} flex flex-cross-center flex-sb`} role='menubar'>
        <div class={`${style.headerNavLogo} flex`}>
          <img src='../../../../assets/img/logo.svg' alt='Nethloader Logo' />
          <p class={`${style.headerNavLogoTitle} flex flex-full-center`}>Nethloader</p>
        </div>
        <div>
          <Button text={viewStrings.about_nethloader} navButton onClickExecute={this.toggleModal} />
        </div>
        <Modal modalTitle='About the project' modalContent={modalContent} isActive={this.state.isActive} toggleModal={this.toggleModal} />
      </header>
    )
  }
}

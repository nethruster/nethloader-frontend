import { h, Component } from 'preact'
import {withRouter} from 'react-router-dom'

import Button from '../button/button.js'
import Modal from '../modal/modal.js'

import style from './header-nav.scss'

import { version } from 'app.config'
import locale from 'locale'
import { closeSession } from 'session-utils/login-manager'

const viewStrings = locale.header_nav

export default withRouter(class HeaderNav extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isModalActive: false
    }

    this.toggleModal = this.toggleModal.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  toggleModal (event) {
    event.stopPropagation()
    this.setState({isModalActive: !this.state.isModalActive})
  }

  handleLogout () {
    closeSession()
    this.props.history.push('/login')
  }

  render () {
    const modalContent = (
      <p>
        This format <strong>allows</strong> , use of <sup>html passed as a prop</sup><br />
        Nethloader v{version}
      </p>
      )
    return (
      <header class={`${style.headerNav} flex flex-cross-center flex-sb`} role='menubar'>
        <div class={`${style.headerNavLogo} flex`}>
          <img src='../../../../assets/img/logo.svg' alt='Nethloader Logo' />
          <p class={`${style.headerNavLogoTitle} flex flex-full-center`}>Nethloader</p>
        </div>
        <nav class={`${style.headerNavLinks} flex flex-full-center`}>
          <Button text={viewStrings.about_nethloader} icon='help-circle' navButton onClickExecute={this.toggleModal} />
          <Button text='Logout' icon='logout' navButton onClickExecute={this.handleLogout} />
        </nav>
        <Modal modalTitle='About the project' modalContent={modalContent} isActive={this.state.isModalActive} toggleModal={this.toggleModal} />
      </header>
    )
  }
})

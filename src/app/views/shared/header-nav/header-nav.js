import { h, Component } from 'preact'
import { NavLink } from 'react-router-dom'
import { connect } from 'preact-redux'

import Button from '../button/button.js'
import Modal from '../modal/modal.js'

import { logoutUser } from 'serverAPI'

import style from './header-nav.scss'

import { version } from 'app.config'
import locale from 'locale'

const viewStrings = locale.header_nav

function mapStateToProps (state) {
  const isAuthenticated = state.auth.isAuthenticated

  return { isAuthenticated }
}

export default connect(mapStateToProps)(class HeaderNav extends Component {
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
    this.props.dispatch(logoutUser(this.context.router.history, this.context.router.route.location.pathname))
  }

  render ({dispatch, isAuthenticated}) {
    const modalContent = (
      <p>
        This format <strong>allows</strong> use of <sup>html passed as a prop</sup><br />
        Nethloader v{version} <br />
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
          { isAuthenticated ? <Button text='Logout' icon='logout' navButton onClickExecute={this.handleLogout} /> : <NavLink to='/login'><Button text='Login' icon='login' navButton /></NavLink>}
        </nav>
        <Modal modalTitle='About the project' modalContent={modalContent} isActive={this.state.isModalActive} toggleModal={this.toggleModal} />
      </header>
    )
  }
})

import { h, Component } from 'preact'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'preact-redux'

import Button from '../button'
import Modal from '../modal'

import { version } from 'app.config'
import locale from 'locale'
import { logoutUser } from 'serverAPI/authentication'

import style from './styles.scss'

const viewStrings = locale.header_nav

function mapStateToProps (state) {
  const {isAuthenticated} = state.authentication

  return {isAuthenticated}
}

export default withRouter(connect(mapStateToProps)(class HeaderNav extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modals: {
        help: {
          isActive: false
        }
      },
      UploadMedia: null
    }

    this.toggleHelpModal = this.toggleHelpModal.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.loadUploadMediaComponent = this.loadUploadMediaComponent.bind(this)
  }

  async loadUploadMediaComponent () {
    let UploadMedia = (await import(/*webpackChunkName: "shared_header-nav_uploadmedia"*/'./uploadMedia')).default
    this.setState({ UploadMedia });
  }

  toggleHelpModal () {
    let modals = {
      ...this.state.modals
    }

    modals.help.isActive = !modals.help.isActive

    this.setState({modals})
  }

  handleLogout () {
    this.props.dispatch(logoutUser(this.props.history))
  }

  render ({dispatch, isAuthenticated, token}) {
    const helpModalContent = (
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
          {isAuthenticated && (this.state.UploadMedia ? <this.state.UploadMedia /> : this.loadUploadMediaComponent())}
          {isAuthenticated && <NavLink to='/cp' activeClassName='dom-hidden'><Button text='Control Panel' icon='cp' navButton /></NavLink>}
          {isAuthenticated ? <Button text='Logout' icon='logout' navButton onClickExecute={this.handleLogout} /> : <NavLink to='/login'><Button text='Login' icon='login' navButton /></NavLink>}
          <Button icon='help-circle' navButton onClickExecute={this.toggleHelpModal} />
        </nav>
        <Modal modalTitle='About the project' modalContent={helpModalContent} isActive={this.state.modals.help.isActive} toggleModal={this.toggleHelpModal} />
      </header>
    )
  }
}))

import { h, Component } from 'preact'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'preact-redux'

import Button from '../button/button.js'
import Modal from '../modal/modal.js'

import { logoutUser } from 'serverAPI/authentication'
import { uploadMedia } from 'serverAPI/media'

import style from './header-nav.scss'

import { version } from 'app.config'
import locale from 'locale'

const viewStrings = locale.header_nav

function mapStateToProps (state) {
  const {isAuthenticated, token, sessionData} = state.authentication

  return {
    isAuthenticated,
    token,
    sessionData
  }
}

export default withRouter(connect(mapStateToProps)(class HeaderNav extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modals: {
        help: {
          isActive: false
        },
        upload: {
          isActive: false
        }
      },
      upload: {
        file: {}
      }
    }

    this.toggleHelpModal = this.toggleHelpModal.bind(this)
    this.toggleUploadModal = this.toggleUploadModal.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleUploadSubmit = this.handleUploadSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
  }

  toggleHelpModal () {
    let modals = {
      ...this.state.modals
    }

    modals.help.isActive = !modals.help.isActive

    this.setState({modals})
  }

  toggleUploadModal () {
    let modals = {
      ...this.state.modals
    }

    modals.upload.isActive = !modals.upload.isActive

    this.setState({modals})
  }

  handleLogout () {
    this.props.dispatch(logoutUser(this.context.router.history))
  }

  handleUploadSubmit (event) {
    event.preventDefault()

    this.props.dispatch(uploadMedia(this.props.sessionData.id, this.state.upload.file, this.props.token)).then((imageId) => {
      this.toggleUploadModal()
      this.context.router.history.push(`/${imageId}`)
    })
  }

  handleFileChange (event) {
    let upload = {
      ...this.state.upload
    }

    upload.file = event.target.files[0]

    this.setState({upload})
  }

  render ({dispatch, isAuthenticated, token}) {
    const helpModalContent = (
      <p>
        This format <strong>allows</strong> use of <sup>html passed as a prop</sup><br />
        Nethloader v{version} <br />
      </p>
    )

    const uploadModalContent = (
      <p>
        <form onSubmit={this.handleUploadSubmit}>
          <input type='file' id='file' name='file' accept='.png,.jpg,.gif,.mp4' onChange={this.handleFileChange} />
          <button type='submit'>submit</button>
        </form>
      </p>
    )

    return (
      <header class={`${style.headerNav} flex flex-cross-center flex-sb`} role='menubar'>
        <div class={`${style.headerNavLogo} flex`}>
          <img src='../../../../assets/img/logo.svg' alt='Nethloader Logo' />
          <p class={`${style.headerNavLogoTitle} flex flex-full-center`}>Nethloader</p>
        </div>
        <nav class={`${style.headerNavLinks} flex flex-full-center`}>
          {isAuthenticated ? <Button text='Upload' icon='upload' navButton onClickExecute={this.toggleUploadModal} /> : ''}
          {isAuthenticated ? <NavLink to='/cp' activeClassName='dom-hidden'><Button text='Control Panel' icon='cp' navButton /></NavLink> : ''}
          <Button text={viewStrings.about_nethloader} icon='help-circle' navButton onClickExecute={this.toggleHelpModal} />
          {isAuthenticated ? <Button text='Logout' icon='logout' navButton onClickExecute={this.handleLogout} /> : <NavLink to='/login'><Button text='Login' icon='login' navButton /></NavLink>}
        </nav>
        <Modal modalTitle='About the project' modalContent={helpModalContent} isActive={this.state.modals.help.isActive} toggleModal={this.toggleHelpModal} />
        <Modal modalTitle='Upload media' modalContent={uploadModalContent} isActive={this.state.modals.upload.isActive} toggleModal={this.toggleUploadModal} />
      </header>
    )
  }
}))

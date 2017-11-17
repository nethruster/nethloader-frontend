import { h, Component } from 'preact'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'preact-redux'

import Button from '../../button'
import Modal from '../../modal'

import { version } from 'app.config'
import locale from 'locale'
import { logoutUser } from 'serverAPI/authentication'

import style from './styles.scss'

const viewStrings = locale.header_nav

function mapStateToProps (state) {
  const { isAuthenticated } = state.authentication

  return { isAuthenticated }
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
    let UploadMedia = (await import(/* webpackChunkName: "shared_header-nav_uploadmedia" */'../uploadMedia')).default
    this.setState({ UploadMedia })
  }

  toggleHelpModal () {
    let modals = {
      ...this.state.modals
    }

    modals.help.isActive = !modals.help.isActive

    this.setState({ modals })
  }

  handleLogout () {
    this.props.dispatch(logoutUser())
  }

  render ({ isAuthenticated }) {
    return (
      <nav class={`${style.links} flex flex-full-center`}>
        {isAuthenticated && (this.state.UploadMedia ? <this.state.UploadMedia /> : this.loadUploadMediaComponent())}
        {isAuthenticated && <NavLink to='/cp' activeClassName='nav-active'><Button text={viewStrings.cp} icon='cp' navButton /></NavLink>}
        {isAuthenticated ? <Button text={viewStrings.logout} icon='logout' navButton onClickExecute={this.handleLogout} /> : <NavLink to='/login'><Button text={viewStrings.login} icon='login' navButton /></NavLink>}
        <Button icon='help-circle' navButton onClickExecute={this.toggleHelpModal} />

        <Modal modalTitle='About the project' isActive={this.state.modals.help.isActive} toggleModal={this.toggleHelpModal}>
          <p>
            This format <strong>allows</strong> use of <sup>html passed as a prop</sup><br />
            Nethloader v{version} <br />
          </p>
        </Modal>
      </nav>
        
    )
  }
}))

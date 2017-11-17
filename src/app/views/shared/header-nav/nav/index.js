import { h, Component } from 'preact'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'preact-redux'

import Button from '../../button'

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
      UploadMedia: null
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.loadUploadMediaComponent = this.loadUploadMediaComponent.bind(this)
  }

  async loadUploadMediaComponent () {
    let UploadMedia = (await import(/* webpackChunkName: "shared_header-nav_uploadmedia" */'../uploadMedia')).default
    this.setState({ UploadMedia })
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
      </nav>
        
    )
  }
}))

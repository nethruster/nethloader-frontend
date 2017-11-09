import { h, Component } from 'preact'
import { NavLink } from 'react-router-dom'
import { connect } from 'preact-redux'

import Icon from '../../shared/icon'

import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.subheader

function mapStateToProps (state) {
  const {isFetchingUser, userData} = state.userData
  const { isFetchingMedia, mediaData } = state.userMedia

  return {
    isFetchingUser,
    userData,
    isFetchingMedia,
    mediaData
  }
}

export default connect(mapStateToProps)(class Subheader extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return this.props.isFetching !== nextProps.isFetching
  }
  
  render ({isFetchingUser, userData, isFetchingMedia, mediaData}) {
    return (
      <div class={`${style.cpsubheader} flex flex-main-center`}>
        <div class={`${style.cpsubheaderWrapper} flex flex-cross-center flex-sb`}>
          <div class={style.cpsubheaderUserStats}>
            <p>{isFetchingUser ? 'Loading...' : userData.name}</p>
            <p>{isFetchingUser ? 'Loading...' : userData.email}</p>
          </div>
          <div class={`${style.cpsubheaderTabs} flex flex-cross-center`}>
            <nav class='flex flex-cross-center flex-sa'>
              <NavLink exact to='/cp/'><Icon iconName='overview' />&nbsp;{viewStrings.tabs.overview}</NavLink>
              <NavLink exact to='/cp/settings'><Icon iconName='settings' />&nbsp;{viewStrings.tabs.settings}</NavLink>
              {isFetchingUser ? null : (userData.isAdmin ? <NavLink exact to='/cp/neth-admin' data-adminbutton><Icon iconName='admin-settings' />&nbsp;{viewStrings.tabs.admin_settings}</NavLink> : null)}
            </nav>
          </div>
        </div>
      </div>
    )
  }
})

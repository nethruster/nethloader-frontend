import {h} from 'preact'
import {NavLink} from 'react-router-dom'
import {connect} from 'preact-redux'

import Icon from '../../../shared/icon'

import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.subheader

function mapStateToProps (state) {
  const {isFetchingUser, userData} = state.userData

  return {
    isFetchingUser,
    userData
  }
}

export default connect(mapStateToProps)(({isFetchingUser, userData}) => {
  return (
    <div class={`${style.tabs} flex flex-cross-center`}>
      <nav class='flex flex-cross-center flex-sa'>
        <NavLink to='/cp/overview' activeClassName='tab-active'><Icon iconName='overview' />&nbsp;{viewStrings.tabs.overview}</NavLink>
        <NavLink exact to='/cp/settings' activeClassName='tab-active'><Icon iconName='settings' />&nbsp;{viewStrings.tabs.settings}</NavLink>
        {userData.isAdmin && <NavLink exact to='/cp/neth-admin' data-adminbutton activeClassName='tab-active'><Icon iconName='admin-settings' />&nbsp;{viewStrings.tabs.admin_settings}</NavLink>}
      </nav>
    </div>

  )
})

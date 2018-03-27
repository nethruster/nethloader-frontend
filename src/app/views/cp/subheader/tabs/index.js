import { h } from 'preact'
import { NavLink } from 'react-router-dom'
import { connect } from 'preact-redux'

import Icon from '../../../shared/icon'

import style from './styles.scss'

const viewStrings = locale.cp.subheader // eslint-disable-line no-undef

function mapStateToProps (state) {
  const { userData } = state.userData

  return { userData }
}

export default connect(mapStateToProps)(({ userData }) => {
  return (
    <div class={`${style.tabs} flex flex-cross-center`}>
      <nav class='flex flex-cross-center flex-sa'>
        <NavLink to='/cp/overview' activeClassName='tab-active'>
          <Icon iconName='overview' />&nbsp;
          {viewStrings.tabs.overview}
        </NavLink>
        <NavLink to='/cp/settings' activeClassName='tab-active'>
          <Icon iconName='settings' />&nbsp;
          {viewStrings.tabs.settings}
        </NavLink>
        {
          userData.isAdmin &&
          <NavLink to='/cp/neth-admin' activeClassName='tab-active' data-dangerbutton>
            <Icon iconName='admin-settings' />&nbsp;
            {viewStrings.tabs.admin_settings}
          </NavLink>
        }
      </nav>
    </div>

  )
})

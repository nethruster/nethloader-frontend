import { h, Component } from 'preact'
import { NavLink } from 'react-router-dom'
import { connect } from 'preact-redux'

import Icon from '../../shared/icon/icon.js'

import style from './subheader.scss'

import locale from 'locale'

const viewStrings = locale.cp.subheader

function mapStateToProps (state) {
  const {hasData, data} = state.data

  return {hasData, data}
}

export default connect(mapStateToProps)(class Subheader extends Component {
  render ({hasData, data}) {
    return (
      <div class={`${style.cpsubheader} flex flex-main-center`}>
        <div class={`${style.cpsubheaderWrapper} flex flex-cross-center flex-sb`}>
          <div class={style.cpsubheaderUserStats}>
            <p>{hasData ? data.name : 'Loading'}</p>
            <p>{hasData ? data.images.length : 'Loading'} {viewStrings.uploads}</p>
          </div>
          <div class={`${style.cpsubheaderTabs} flex flex-cross-center`}>
            <nav class='flex flex-cross-center flex-sa'>
              <NavLink exact to='/cp/'><Icon iconName='overview' />&nbsp;{viewStrings.tabs.overview}</NavLink>
              <NavLink exact to='/cp/settings'><Icon iconName='settings' />&nbsp;{viewStrings.tabs.settings}</NavLink>
              {(hasData ? data.isAdmin : 'Loading') && <NavLink exact to='/cp/neth-admin' data-adminbutton><Icon iconName='admin-settings' />&nbsp;{viewStrings.tabs.admin_settings}</NavLink>}
            </nav>
          </div>
        </div>
      </div>
    )
  }
})

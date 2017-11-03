import { h, Component } from 'preact'
import { NavLink } from 'react-router-dom'
import { connect } from 'preact-redux'

import Icon from '../../shared/icon'

import locale from 'locale'

import style from './styles.scss'

const viewStrings = locale.cp.subheader

function mapStateToProps (state) {
  const {isFetching, data} = state.data

  return {
    isFetching,
    data
  }
}

export default connect(mapStateToProps)(class Subheader extends Component {
  render ({isFetching, data}) {
    return (
      <div class={`${style.cpsubheader} flex flex-main-center`}>
        <div class={`${style.cpsubheaderWrapper} flex flex-cross-center flex-sb`}>
          <div class={style.cpsubheaderUserStats}>
            <p>{isFetching ? 'Loading' : data.name}</p>
            <p>{isFetching ? 'Loading' : data.images.length} {viewStrings.uploads}</p>
          </div>
          <div class={`${style.cpsubheaderTabs} flex flex-cross-center`}>
            <nav class='flex flex-cross-center flex-sa'>
              <NavLink exact to='/cp/'><Icon iconName='overview' />&nbsp;{viewStrings.tabs.overview}</NavLink>
              <NavLink exact to='/cp/settings'><Icon iconName='settings' />&nbsp;{viewStrings.tabs.settings}</NavLink>
              {isFetching ? null : (data.isAdmin ? <NavLink exact to='/cp/neth-admin' data-adminbutton><Icon iconName='admin-settings' />&nbsp;{viewStrings.tabs.admin_settings}</NavLink> : null)}
            </nav>
          </div>
        </div>
      </div>
    )
  }
})

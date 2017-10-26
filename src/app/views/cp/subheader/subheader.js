import { h, Component } from 'preact'
import { NavLink } from 'react-router-dom'

import Icon from '../../shared/icon/icon.js'

import style from './subheader.scss'

import locale from 'locale'

const viewStrings = locale.cp.subheader

export default class Subheader extends Component {
  render () {
    return (
      <div class={`${style.cpsubheader} flex flex-main-center`}>
        <div class={`${style.cpsubheaderWrapper} flex flex-cross-center flex-sb`}>
          <div class={style.cpsubheaderUserStats}>
            <p>Username</p>
            <p>X {viewStrings.uploads}</p>
          </div>
          <div class={`${style.cpsubheaderTabs} flex flex-cross-center`}>
            <nav class='flex flex-cross-center flex-sa'>
              <NavLink exact to='/cp/'><Icon iconName='overview' />&nbsp;{viewStrings.tabs.overview}</NavLink>
              <NavLink exact to='/cp/settings'><Icon iconName='settings' />&nbsp;{viewStrings.tabs.settings}</NavLink>
              <NavLink exact to='/cp/neth-admin' data-adminbutton><Icon iconName='admin-settings' />&nbsp;{viewStrings.tabs.admin_settings}</NavLink>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

import { h, Component } from 'preact'
import { NavLink } from 'react-router-dom'

import style from './cpsubheader.scss'

import locale from 'locale'

const viewStrings = locale.cp.subheader

export default class CPSubheader extends Component {
  render () {
    return (
      <div class={`${style.cpsubheader} flex flex-main-center`}>
        <div class={`${style.cpsubheaderWrapper} flex flex-cross-center flex-sb`}>
          <div class={style.cpsubheaderUserStats}>
            <p>Name</p>
            <p>X {viewStrings.uploads}</p>
          </div>
          <div class={`${style.cpsubheaderTabs} flex flex-cross-center`}>
            <nav class='flex flex-cross-center flex-sa'>
              <NavLink exact to='/cp/' class='flex flex-full-center'>{viewStrings.tabs.overview}</NavLink>
              <NavLink exact to='/cp/settings' class='flex flex-full-center'>{viewStrings.tabs.settings}</NavLink>
              <NavLink exact to='/cp/neth-admin' class='flex flex-full-center'>{viewStrings.tabs.admin_settings}</NavLink>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

import { h, Component } from 'preact'
import { NavLink } from 'react-router-dom'

import style from './cpsubheader.scss'

export default class CPSubheader extends Component {
  render () {
    return (
      <div class={`${style.cpsubheader} flex flex-main-center`}>
        <div class={`${style.cpsubheaderWrapper} flex flex-cross-center flex-sb`}>
          <div class={style.cpsubheaderUserStats}>
            <p>Name</p>
            <p>0 uploads</p>
          </div>
          <div class={`${style.cpsubheaderTabs} flex flex-cross-center`}>
            <nav class='flex flex-cross-center flex-sa'>
              <NavLink exact to='/cp/' class='flex flex-full-center'>Overview</NavLink>
              <NavLink exact to='/cp/settings' class='flex flex-full-center'>Settings</NavLink>
              <NavLink exact to='/cp/neth-admin' class='flex flex-full-center'>Admin Settings</NavLink>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

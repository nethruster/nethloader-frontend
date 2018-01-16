import {h} from 'preact'
import {NavLink} from 'react-router-dom'

import style from './styles.scss'

export default function () {
  return (
    <div class={`flex flex-dc ${style.sidebar}`}>
      <div class='flex flex-main-center flex-dc'>
        <div class={style.sidebarLinks}>
          <NavLink to='/cp/neth-admin/users' activeClassName={style.activeSection}>
            <h6>Users</h6>
            <p>
              Manage users and their details<br />
              <small>Click to open</small>
            </p>
          </NavLink>
          <NavLink to='/cp/neth-admin/images' activeClassName={style.activeSection}>
            <h6>Images</h6>
            <p>
                Manage all existing media on Nethloader <br />
              <small>Click to open</small>
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

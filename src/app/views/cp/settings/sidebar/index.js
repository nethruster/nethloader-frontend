import {h} from 'preact'
import {NavLink} from 'react-router-dom'

import style from './styles.scss'

export default function () {
  return (
    <div class={`flex flex-dc ${style.sidebar}`}>
      <div class='flex flex-main-center flex-dc'>
        <h5>Uploading from software</h5>
        <p>
            Nethloader can be integrated with 3rd party services and software using an APIkey by which you can upload images to this account.
        </p>
        <p>
            The key can be used to upload media to this account directly and without authentication, be careful with it.
        </p>
        <div class={style.sidebarLinks}>
          <NavLink to='/cp/settings/sharex' activeClassName={style.activeSection}>
            <h6>ShareX</h6>
            <p>
                A free application for windows which works great when used with Nethloader.<br />
              <small>Click to read guide.</small>
            </p>
          </NavLink>
          <NavLink to='/cp/settings/curl' activeClassName={style.activeSection}>
            <h6>cURL and others</h6>
            <p>
                It's also possible to upload files using cURL in your terminal on Mac and Linux systems.<br />
              <small>Click to read guide</small>
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

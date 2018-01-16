import {h} from 'preact'
import {Switch, Route} from 'react-router-dom'

import Sidebar from './admin-sidebar'
import SettingsGrid from './admin-settings-grid'
import UsersPartial from './admin-sidebar/sidebar-partials/users'

import style from './styles.scss'

export default function () {
  return (
    <div class={`flex ${style.cpadmin}`}>
      <Sidebar />
      <Switch>
        <Route
          path='/cp/neth-admin/users'
          exact
          component={UsersPartial} />

        <Route
          path=''
          component={SettingsGrid} />
      </Switch>

    </div>
  )
}

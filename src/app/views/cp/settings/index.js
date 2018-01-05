import {h} from 'preact'
import {Switch, Route} from 'react-router-dom'

import Sidebar from './sidebar'
import SettingsGrid from './settings-grid'
import SharexPartial from './sidebar/sidebar-partials/sharex'
import CurlPartial from './sidebar/sidebar-partials/curl'

import style from './styles.scss'

export default function () {
  return (
    <div class={`flex ${style.settings}`}>
      <Sidebar />
      <Switch>
        <Route
          path='/cp/settings/sharex'
          exact
          component={SharexPartial} />

        <Route
          path='/cp/settings/curl'
          component={CurlPartial} />

        <Route
          path=''
          component={SettingsGrid} />
      </Switch>

    </div>
  )
}

import { h, Component } from 'preact'
import { Switch, Route } from 'react-router-dom'

import asyncComponent from 'asyncComponent'
import Subheader from './subheader/subheader.js'

import style from './cp.scss'

export default class ControlPanel extends Component {
  render () {
    return (
      <div class={`${style.cp} flex flex-dc flex-cross-center`}>
        <Subheader />
        <Switch>
          <Route
            path='/cp/'
            exact
            component={asyncComponent(() => import(/* webpackChunkName: "content_cp_overview" */'./overview/overview.js')
              .then(module => module.default))} />
          <Route
            path='/cp/settings'
            exact
            component={asyncComponent(() => import(/* webpackChunkName: "content_cp_settings" */'./settings/settings.js')
              .then(module => module.default))} />
          <Route
            path='/cp/neth-admin'
            exact
            component={asyncComponent(() => import(/* webpackChunkName: "content_cp_admin" */'./admin/admin.js')
              .then(module => module.default))} />
        </Switch>
      </div>
    )
  }
}

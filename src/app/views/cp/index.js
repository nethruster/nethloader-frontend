import { h, Component } from 'preact'
import { Switch, Route, Redirect } from 'react-router-dom'

import asyncComponent from 'asyncComponent'
import Subheader from './subheader'

import style from './styles.scss'

export default class ControlPanel extends Component {
  render () {
    return (
      <div class={`${style.cp} flex flex-dc flex-cross-center`}>
        <Subheader />
        <Switch>
          <Redirect exact from='/cp' to='/cp/overview' />
          <Route path='/cp/overview/:pageFactor?'
            exact
            component={asyncComponent(() => import(/* webpackChunkName: "content_cp_overview" */'./overview')
              .then(module => module.default))} />
          <Route
            path='/cp/settings'
            exact
            component={asyncComponent(() => import(/* webpackChunkName: "content_cp_settings" */'./settings')
              .then(module => module.default))} />
          <Route
            path='/cp/neth-admin'
            exact
            component={asyncComponent(() => import(/* webpackChunkName: "content_cp_admin" */'./admin')
              .then(module => module.default))} />
        </Switch>
      </div>
    )
  }
}

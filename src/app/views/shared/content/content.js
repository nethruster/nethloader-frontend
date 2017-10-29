import { h, Component } from 'preact'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'preact-redux'

import asyncComponent from 'asyncComponent'
import HeaderNav from '../header-nav/header-nav.js'

import { getUserData } from 'serverAPI/data'

import style from './content.scss'

function mapStateToProps (state) {
  const {isAuthenticated} = state.auth

  return {isAuthenticated}
}

export default connect(mapStateToProps)(class Content extends Component {
  render ({isAuthenticated}) {
    return (
      <div class={`${style.content} flex flex-dc`} role='main'>
        <HeaderNav />
        <Switch>
          {isAuthenticated ? 
          <Route
            path='/cp'
            component={asyncComponent(() => import(/* webpackChunkName: "content_cp" */'../../cp/cp.js')
          .then(module => module.default))} /> 
          : 
          <Redirect from='/cp' to='/login' />}

          <Route
            path='/:id([A-Za-z0-9_~]{10})'
            component={asyncComponent(() => import(/* webpackChunkName: "content_media-view" */'../../media-view/media-view.js')
              .then(module => module.default))} />
        </Switch>
      </div>
    )
  }
})

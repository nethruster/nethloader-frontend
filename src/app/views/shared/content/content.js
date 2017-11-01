import { h, Component } from 'preact'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'preact-redux'

import {getUserData} from 'serverAPI/data'
import {logoutUserNoHistory, checkCurrentSessionToken} from 'serverAPI/authentication'
import {checkTokenExpiryDate} from 'utils'

import asyncComponent from 'asyncComponent'
import HeaderNav from '../header-nav/header-nav.js'

import style from './content.scss'

function mapStateToProps (state) {
  const {isAuthenticated, token, sessionData} = state.authentication

  return {
    isAuthenticated,
    token,
    sessionData
  }
}

export default connect(mapStateToProps)(class Content extends Component {
  componentWillMount() {
    if(this.props.isAuthenticated) {
      checkCurrentSessionToken(this.props.token).then(async (result) => {
         if (await result){ 
            await checkTokenExpiryDate(this.props.sessionData.exp) ? this.props.dispatch(getUserData(this.props.sessionData.id, this.props.token)) : logoutUserNoHistory(true)
          } else {
            logoutUserNoHistory(true)
          }
      })
    } else {
      logoutUserNoHistory(false)
    }
  }

  render ({dispatch, isAuthenticated}) {
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

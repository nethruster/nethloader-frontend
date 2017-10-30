import { h, Component } from 'preact'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'preact-redux'

import {getUserData} from 'serverAPI/data'
import {logoutUserNoHistory} from 'serverAPI/authentication'
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
      checkTokenExpiryDate(this.props.sessionData.exp).then((result) => {
        if (result) {
          this.props.dispatch(getUserData(this.props.sessionData.id, this.props.token))
        } else {
          this.props.dispatch(logoutUserNoHistory())
        }
      }) 
    } else {
      this.props.dispatch(logoutUserNoHistory())
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

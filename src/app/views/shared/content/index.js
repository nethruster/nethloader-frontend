import { h, Component } from 'preact'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'preact-redux'

import { checkUserSessionValidity } from 'utils'
import { getUserData } from 'serverAPI/data'
import { logoutUserNoHistory } from 'serverAPI/authentication'

import asyncComponent from 'asyncComponent'
import HeaderNav from '../header-nav'

import style from './styles.scss'

function mapStateToProps (state) {
  const { isAuthenticated, token, sessionData } = state.authentication

  return {
    isAuthenticated,
    token,
    sessionData
  }
}

export default connect(mapStateToProps)(class Content extends Component {
  componentWillMount() {
    if(this.props.isAuthenticated) {
      checkUserSessionValidity(this.props.token, this.props.sessionData.exp).then(async (result) => {
        await result ? this.props.dispatch(getUserData(this.props.sessionData.id, this.props.token)) : logoutUserNoHistory(true)
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
            component={asyncComponent(() => import(/* webpackChunkName: "content_cp" */'../../cp') 
          .then(module => module.default))} /> 

          : 
          <Redirect from='/cp' to='/login' />}

          <Route
            path='/:id([A-Za-z0-9_~]{10})'
            component={asyncComponent(() => import(/* webpackChunkName: "content_media-view" */'../../media-view')
              .then(module => module.default))} />
        </Switch>
      </div>
    )
  }
})

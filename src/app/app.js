import { h, Component } from 'preact'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'preact-redux'

import asyncComponent from 'asyncComponent'

import style from './app.scss'

function mapStateToProps (state) {
  const {isAuthenticated} = state.authentication

  return {isAuthenticated}
}

export default connect(mapStateToProps)(class App extends Component {
  render ({isAuthenticated}) {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            component={asyncComponent(() => import(/* webpackChunkName: "home" */'./views/home/home.js').then(module => module.default))}
          />

          {isAuthenticated ? <Redirect from='/login' to='/cp' />
          : 
          <Route
            exact
            path='/login'
            component={asyncComponent(() => import(/* webpackChunkName: "login" */'./views/login/login.js').then(module => module.default))}
          />}

          <Route
            exact
            path='/register'
            component={asyncComponent(() => import(/* webpackChunkName: "register" */'./views/register/register.js').then(module => module.default))}
          />

          <Route
            path='/:content'
            component={asyncComponent(() => import(/* webpackChunkName: "content" */'./views/shared/content/content.js').then(module => module.default))}
          />
        </Switch>
      </BrowserRouter>
    )
  }
})

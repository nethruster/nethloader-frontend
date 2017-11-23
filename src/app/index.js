import {h, Component} from 'preact'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'preact-redux'

import asyncComponent from 'asyncComponent'
import Content from '../app/views/shared/content'

import './styles.scss'

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
            component={asyncComponent(() => import(/* webpackChunkName: "home" */'./views/home').then(module => module.default))}
          />

          {isAuthenticated
            ? <Redirect from='/login' to='/cp' />
            : <Route
              exact
              path='/login'
              component={asyncComponent(() => import(/* webpackChunkName: "login" */'./views/login').then(module => module.default))}
            />
          }

          <Route
            exact
            path='/register'
            component={asyncComponent(() => import(/* webpackChunkName: "register" */'./views/register').then(module => module.default))}
          />

          <Route
            path='/:content'
            component={Content}
          />
        </Switch>
      </BrowserRouter>
    )
  }
})

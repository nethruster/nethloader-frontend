import { h } from 'preact'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'preact-redux'

import asyncComponent from 'asyncComponent'
import Content from './views/content'
import { Snackbar } from 'react-redux-snackbar'

// Global CSS custom properties
import 'style-vars.scss'
import './styles.scss'

function mapStateToProps (state) {
  const { isAuthenticated } = state.authentication

  return { isAuthenticated }
}

const snackStyles = {
  snack: {
    padding: '16px',
    border: 'none'
  },
  button: {
    color: '#f2f2f2',
    cursor: 'pointer'
  },
  'span': {
    fontSize: '1em',
    letterSpacing: '.5px',
    fontWeight: '300'
  }
}

export default connect(mapStateToProps)(({ isAuthenticated }) => {
  return (
    <BrowserRouter>
      <div class='stupid-container'>
        <Switch>
          {isAuthenticated
            ? <Redirect exact from='/' to='/cp' />
            : <Route
              exact
              path='/'
              component={asyncComponent(() => import(/* webpackChunkName: "home" */'./views/home')
                .then(module => module.default))}
            />
          }

          {isAuthenticated
            ? <Redirect exact from='/login' to='/cp' />
            : <Route
              exact
              path='/login'
              component={asyncComponent(() => import(/* webpackChunkName: "login" */'./views/login')
                .then(module => module.default))}
            />
          }

          <Route
            exact
            path='/register'
            component={asyncComponent(() => import(/* webpackChunkName: "register" */'./views/register')
              .then(module => module.default))}
          />

          <Route
            path='/:content'
            component={Content}
          />
        </Switch>
        <Snackbar customStyles={snackStyles} />
      </div>
    </BrowserRouter>
  )
})

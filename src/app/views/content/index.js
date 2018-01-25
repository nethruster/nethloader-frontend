import {h, Component} from 'preact'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'preact-redux'
import {Snackbar} from 'react-redux-snackbar'

import {checkUserSessionValidity} from 'utils'
import {getUserData} from 'serverAPI/data'
import {logoutUser} from 'serverAPI/authentication'
import asyncComponent from 'asyncComponent'
import Footer from '../shared/footer'
import HeaderNav from '../header-nav'
import NotFound from '../shared/not-found'
import MediaView from '../media-view'

import style from './styles.scss'

function mapStateToProps (state) {
  const {isAuthenticated, token, sessionData} = state.authentication

  return {
    isAuthenticated,
    token,
    sessionData
  }
}

const snackStyles = {
  snack: {
    padding: '16px'
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

export default connect(mapStateToProps)(class Content extends Component {
  async componentWillMount () {
    if (this.props.isAuthenticated) {
      if (await checkUserSessionValidity(this.props.token, this.props.sessionData.exp)) {
        this.props.dispatch(getUserData(this.props.sessionData.id, this.props.token))
      } else {
        this.props.dispatch(logoutUser())
      }
    }
  }
  
  render ({isAuthenticated}) {
    return (
      <div class={`${style.content} flex flex-dc`} role='main'>
        <HeaderNav />
        <Switch>
          {
            isAuthenticated
              ? <Route
                path='/cp'
                component={asyncComponent(() => import(/* webpackChunkName: "content_cp" */'../cp')
                  .then(module => module.default))} />

              : <Redirect from='/cp' to='/login' />
          }

          <Route
            path='/:id([A-Za-z0-9_~]{10})'
            component={MediaView} />

          <Route
            path=''
            component={NotFound} />
        </Switch>
        <Footer contentFooter />
        <Snackbar customStyles={snackStyles} />
      </div>
    )
  }
})

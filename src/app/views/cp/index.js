import {h} from 'preact'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'preact-redux'

import asyncComponent from 'asyncComponent'
import Subheader from './subheader'
import ViewLoading from '../shared/view-loading'
import NotFound from '../shared/not-found'

import style from './styles.scss'

const mapStateToProps = (state) => {
  const {isFetchingUser} = state.userData

  return {isFetchingUser}
}

export default connect(mapStateToProps)(({isFetchingUser}) => {
  return (
    isFetchingUser
      ? <ViewLoading />
      : (
        <div class={`${style.cp} flex flex-dc flex-cross-center`}>
          <Subheader />
          <Switch>
            <Redirect exact from='/cp' to='/cp/overview' />
            <Route path='/cp/overview/:pageFactor([0-9]*)?'
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
            <Route
              path=''
              component={NotFound} />
          </Switch>
        </div>
      )
  )
})

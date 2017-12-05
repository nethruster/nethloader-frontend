import {h, render} from 'preact'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'preact-redux'
import thunkMiddleware from 'redux-thunk'

import asyncComponent from 'asyncComponent'
import {checkBrowserIntegrity} from 'utils'

import reducers from 'reducers'

// Simple feature check to prevent some browsers from hurting themselves and others around them
try {
  checkBrowserIntegrity()
} catch (err) {
  document.body.firstChild.innerHTML = '<div class="wtf-gtfo flex flex-full-center flex-dc" style="width:100vw;height:100vh;"><a href="https://github.com/nethruster/nethloader"><img alt="Nethloader Logo" width="150" src="/assets/img/logo.svg" /></a><p>This domain is using <a href="https://github.com/nethruster/nethloader">Nethloader</a>, a self hosted media sharing service.</p><span>Unfortunately, ' + err.message + '</span></div>'
  throw Error('App could not start')
}

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

let App = asyncComponent(() => import(/* webpackChunkName: "app" */'./app').then(module => module.default))

let store = createStoreWithMiddleware(reducers)

const mountPoint = document.getElementById('nethloader')

if (module.hot || process.env.NODE_ENV !== 'production') {
  require('preact/devtools')
  store = createStoreWithMiddleware(reducers, (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
}

render(<Provider store={store}><App /></Provider>, mountPoint, mountPoint.lastChild)

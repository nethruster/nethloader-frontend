import { h, render } from 'preact'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'preact-redux'
import thunkMiddleware from 'redux-thunk'

import asyncComponent from 'asyncComponent'

import reducers from 'reducers'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

let App = asyncComponent(() => import(/* webpackChunkName: "app" */'./app').then(module => module.default))

let store = createStoreWithMiddleware(reducers)

if (module.hot) {
  require('preact/devtools')
  store = createStoreWithMiddleware(reducers, (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
}

const mountPoint = document.getElementById('nethloader')

// Simple feature check to prevent some browsers from hurting themselves and others around them
if (typeof Promise !== 'undefined' && Promise.toString().indexOf('[native code]') !== -1) {
  render(<Provider store={store}><App /></Provider>, mountPoint, mountPoint.lastChild)
} else {
  window.alert('Please, use an updated browser like Google Chrome or Firefox if you want to use this website properly.')
  console.error('This browser doesn\'t support necessary web technology for this site to work, please, use an updated browser like Google Chrome or Firefox if you want to use this website properly.')
}

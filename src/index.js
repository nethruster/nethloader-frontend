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

render(<Provider store={store}><App /></Provider>, mountPoint, mountPoint.lastChild)

'use strict'

import { h, render } from 'preact'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'preact-redux'
import thunkMiddleware from 'redux-thunk'

import reducers from 'reducers'

import asyncComponent from 'asyncComponent'


if(module.hot) {
  require('preact/devtools')
}

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

let App = asyncComponent(() => import(/* webpackChunkName: "app" */'./app/app.js').then(module => module.default))

// TODO: remove redux dev tools in production
let store = createStoreWithMiddleware(reducers, (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

const mountPoint = document.getElementById('nethloader')

render(<Provider store={store}><App /></Provider>, mountPoint, mountPoint.lastChild)

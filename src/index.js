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

let store = createStoreWithMiddleware(reducers)

const mountPoint = document.getElementById('nethloader')

render(<Provider store={store}><App /></Provider>, mountPoint, mountPoint.lastChild)

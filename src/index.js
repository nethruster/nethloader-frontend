import {h, render} from 'preact'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'preact-redux'
import thunkMiddleware from 'redux-thunk'

import asyncComponent from 'asyncComponent'

import reducers from 'reducers'

if (!document.getElementById('wtf-gtfo')) { // If this node is present the app did not start correctly
  let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

  let App = asyncComponent(() => import(/* webpackChunkName: "app" */'./app').then(module => module.default))

  let store = createStoreWithMiddleware(reducers)

  const mountPoint = document.getElementById('nethloader')

  if (module.hot || process.env.NODE_ENV !== 'production') {
    require('preact/devtools')
    store = createStoreWithMiddleware(reducers, (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
  }

  // Toggle site theme
  if (window.localStorage.getItem('nth-theme') === 'dark') {
    document.documentElement.setAttribute('dark', '')
  } else {
    document.documentElement.removeAttribute('dark')
  }

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    mountPoint,
    mountPoint.lastChild
  )
} else { console.error('App could not start') }

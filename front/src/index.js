import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

import App from './App'
import { createStore } from 'redux'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

import reducers from './reducers'


const history = createHistory()
const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

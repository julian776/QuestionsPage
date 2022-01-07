import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './App'
import rootReducer from './reducers'

import './index.css'
import Footer from './components/Fotter'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

render(
  <Provider store={store}>
    <App dispatch={store.dispatch}/>
    <Footer />
  </Provider>,
  document.getElementById('root')
)

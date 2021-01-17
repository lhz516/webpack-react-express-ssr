import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import history from './history'
import reducers from '@reducers/index.js'

const composeEnhancers =
  __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

export default createStore(
  reducers,
  window.__PRELOADED_STATE__,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({ history })))
)

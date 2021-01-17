import React from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router'
import Home from '../home/home'

const App = ({ Router, routerProps, store }) => (
  <Provider store={store}>
    <Router {...routerProps}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>
)

export default App

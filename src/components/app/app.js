import React from 'react'
import { Provider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Home from '../home/home'
import NotFound from '../not-found/not-found'

const App = ({ Router, routerProps, store }) => (
  <Provider store={store}>
    <Router {...routerProps}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </Provider>
)

export default App

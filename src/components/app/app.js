import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Home from '../home/home'
import NotFound from '../not-found/not-found'

const App = ({ Router, routerProps, store, helmetContext = {} }) => (
  <Provider store={store}>
    <HelmetProvider context={helmetContext}>
      <Router {...routerProps}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  </Provider>
)

export default App

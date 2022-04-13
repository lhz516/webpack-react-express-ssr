import React from 'react'
import { hydrate } from 'react-dom'
import App from '@components/app/app'
import { BrowserRouter } from 'react-router-dom'
import store from './store'

const startup = () => {
  hydrate(
    <App Router={BrowserRouter} store={store} />,
    document.getElementById('root')
  )
}

startup()

if (module.hot) {
  module.hot.accept('../components/app/app', () => {
    startup()
  })
}

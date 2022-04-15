import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from '@components/app/app'
import { BrowserRouter } from 'react-router-dom'
import store from './store'

const createApp = () => <App Router={BrowserRouter} store={store} />

const root = hydrateRoot(document.getElementById('root'), createApp())

if (module.hot) {
  module.hot.accept('../components/app/app', () => {
    root.render(createApp())
  })
}

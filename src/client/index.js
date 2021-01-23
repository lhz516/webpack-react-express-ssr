import React from 'react'
import { hydrate } from 'react-dom'
import App from '@components/app/app'
import history from './history'
import { Router } from 'react-router'
import store from './store'

const startup = () => {
  hydrate(
    <App Router={Router} routerProps={{ history }} store={store} />,
    document.getElementById('root')
  )
}

startup()

if (module.hot) {
  module.hot.accept('../components/app/app', () => {
    startup()
  })
}

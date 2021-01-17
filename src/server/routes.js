import React from 'react'
import express from 'express'
import { StaticRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import { renderToString } from 'react-dom/server'
import App from '@components/app/app'
import assets from '@dist/server/assets.json'
import { createStore } from 'redux'
import reducers from '@reducers'

const router = express.Router()

/* GET all pages */
router.get('/*', (req, res) => {
  const context = {}

  const initialReduxState = {
    global: { foo: 0 },
  }
  const store = createStore(reducers, initialReduxState)

  const appString = renderToString(
    <App
      Router={StaticRouter}
      routerProps={{
        location: req.originalUrl,
        context,
      }}
      store={store}
    />
  )

  const preloadedState = store.getState()

  const helmet = Helmet.renderStatic()

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    return res.redirect(301, context.url)
  }

  res.render('index', {
    appString,
    titleTag: helmet.title.toString(),
    preloadedState,
    assets,
  })
})

export default router

import React from 'react'
import express from 'express'
import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'
import App from '@components/app/app'
import assets from '@dist/server/assets.json'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from '@slices'

const router = express.Router()

/* GET all pages */
router.get('/*', (req, res) => {
  // Redirect
  // if (req.url === '/some-page') {
  //   return res.redirect(301, '/')
  // }

  const helmetContext = {}

  const preloadedState = {
    global: { foo: 0 },
  }
  const store = configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  })

  const appString = renderToString(
    <App
      Router={StaticRouter}
      routerProps={{
        location: req.originalUrl,
      }}
      store={store}
      helmetContext={helmetContext}
    />
  )

  const injectedPreloadState = store.getState()

  const { helmet } = helmetContext

  res.render('index', {
    appString,
    titleTag: helmet.title.toString(),
    injectedPreloadState,
    assets,
  })
})

export default router

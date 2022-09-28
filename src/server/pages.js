import React from 'react'
import express from 'express'
import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'
import App from '@components/app/app'
import assets from '@dist/server/assets.json'
import { createStore } from '@utils/redux'
import todoService from '@services/todos'

const pagesRouter = express.Router()

/* GET all pages */
pagesRouter.get('/*', async (req, res) => {
  // Redirect
  // if (req.url === '/some-page') {
  //   return res.redirect(301, '/')
  // }

  const helmetContext = {}

  const preloadedState = {
    global: { foo: 0 },
  }
  const store = createStore(preloadedState)

  const renderRoot = () =>
    renderToString(
      <App
        Router={StaticRouter}
        routerProps={{
          location: req.originalUrl,
        }}
        store={store}
        helmetContext={helmetContext}
      />
    )

  renderRoot()
  await Promise.all(todoService.util.getRunningOperationPromises())

  const appString = renderRoot()

  const injectedPreloadState = store.getState()

  const { helmet } = helmetContext

  res.render('index', {
    appString,
    titleTag: helmet.title.toString(),
    injectedPreloadState,
    assets,
    isProd: __PROD__,
  })
})

export default pagesRouter

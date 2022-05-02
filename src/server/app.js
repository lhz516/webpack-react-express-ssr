import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import proxy from 'express-http-proxy'
import routes from './routes'
const { DEV_ASSETS_HOST, DEV_ASSETS_PORT } = require('../../settings')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, '../../src/server/views'))
app.set('view engine', 'ejs')

if (__DEV__) {
  app.use(logger('dev'))
} else {
  app.use(
    logger('common', {
      skip(req, res) {
        return res.statusCode < 400
      },
    })
  )
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

if (__DEV__) {
  app.use(
    '/static',
    proxy(`${DEV_ASSETS_HOST}:${DEV_ASSETS_PORT}`, {
      proxyReqPathResolver: (req) => `/static${req.url}`,
    })
  )
} else {
  app.use(express.static(path.join(__dirname, '../client/assets')))
}

// All routes for React app
app.use('/', routes)

// error handler
app.use((err, req, res, next) => {
  let error

  // Only show error in dev mode
  if (__DEV__) {
    error = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    }
  }
  res.status(500)
  res.render('error', { error })

  // Show error in the console
  next(err)
})

export default app

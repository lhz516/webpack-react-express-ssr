import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import routes from './routes'

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
  app.use(express.static(path.join(__dirname, '../../src/public')))
} else {
  app.use(express.static(path.join(__dirname, '../client/assets')))
}

app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = __DEV__ ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app

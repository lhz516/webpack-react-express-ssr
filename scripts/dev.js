const path = require('path')
const { execSync } = require('child_process')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const nodemon = require('nodemon')
const webpackClientConfig = require('../webpack/client-config')()
const webpackServerConfig = require('../webpack/server-config')()
const {
  DEV_PORT,
  DEV_ASSETS_HOST,
  DEV_ASSETS_PORT,
  DEV_HOST,
} = require('../settings')

let clientAssetsInitialized = false
let nodemonInitialized = false

const devServerOptions = {
  static: {
    directory: path.join(__dirname, '../dist/client/assets'),
  },
  host: DEV_ASSETS_HOST,
  port: DEV_ASSETS_PORT,
  headers: { 'Access-Control-Allow-Origin': '*' },
  hot: true,
  open: [`http://${DEV_HOST}:${DEV_PORT}/`],
}

const nodeServerCompiler = webpack(webpackServerConfig)
const clientCompiler = webpack(webpackClientConfig)

clientCompiler.hooks.afterEmit.tap('clientAfterEmitPlugin', () => {
  console.info('[webpack] client assets emitted')
  if (!clientAssetsInitialized) {
    clientAssetsInitialized = true
    nodeServerCompiler.hooks.afterEmit.tap('serverAfterEmitPlugin', () => {
      console.info('[webpack] server assets emitted')
      if (!nodemonInitialized) {
        nodemonInitialized = true
        // Starting nodemon watch
        console.info('[nodemon] starting')
        nodemon({
          script: 'dist/server/app-dev',
          ext: 'js json',
          watch: ['dist/server/app-dev.js'],
        })
          .on('start', () => {
            console.info(
              `[nodemon] started. Now starting local web server at port ${DEV_PORT}`
            )
          })
          .on('crash', () => {
            console.error('[nodemon] crashed')
          })
      }
    })

    nodeServerCompiler.watch({}, (err, stats) => {
      if (err) {
        return console.error(err)
      }
      const statString = stats.toString()
      process.stdout.write(statString + '\n')
    })
  }
})

const devServer = new WebpackDevServer(devServerOptions, clientCompiler)

execSync('yarn clean')

devServer.startCallback((err) => {
  if (err) {
    console.error('[webpack] devServer listening failed')
    return console.error(err)
  }
  console.info(`[webpack] devServer listening on port ${DEV_ASSETS_PORT}`)
})

const path = require('path')
const { execSync } = require('child_process')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const nodemon = require('nodemon')
const webpackClientConfig = require('../webpack/client-config')()
const webpackServerConfig = require('../webpack/server-config')()
const { DEV_PORT, DEV_ASSETS_HOST, DEV_ASSETS_PORT } = require('../settings')

let clientAssetsInitialized = false
let nodemonInitialized = false

const devServerOptions = {
  contentBase: path.join(__dirname, '../dist/client/assets'),
  compress: true,
  host: DEV_ASSETS_HOST,
  port: DEV_ASSETS_PORT,
  headers: { 'Access-Control-Allow-Origin': '*' },
  hot: true,
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

webpackDevServer.addDevServerEntrypoints(webpackClientConfig, devServerOptions)
const devServer = new webpackDevServer(clientCompiler, devServerOptions)

execSync('yarn clean')

devServer.listen(DEV_ASSETS_PORT, DEV_ASSETS_HOST, (err) => {
  if (err) {
    return console.error('[webpack] devServer listening failed')
  }
  console.info(`[webpack] devServer listening on port ${DEV_ASSETS_PORT}`)
})

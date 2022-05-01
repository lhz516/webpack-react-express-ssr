const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { getWebpackDefinePlugin } = require('./utils')

module.exports = (env = {}) => {
  const isProd = !!env.prod

  return {
    mode: isProd ? 'production' : 'development',
    stats: 'errors-warnings',
    target: 'node',
    externals: [nodeExternals()],
    entry: './src/server/index.js',
    output: {
      path: path.resolve(__dirname, '../dist/server'),
      filename: isProd ? 'app-prod.js' : 'app-dev.js',
      libraryTarget: 'commonjs',
    },
    resolve: {
      alias: {
        '@settings': path.resolve(__dirname, '../settings.js'),
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@slices': path.resolve(__dirname, '../src/slices'),
        '@actions': path.resolve(__dirname, '../src/actions'),
        '@hooks': path.resolve(__dirname, '../src/hooks'),
        '@dist': path.resolve(__dirname, '../dist'),
      },
      extensions: ['.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'ignore-loader',
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: { node: 'current' } }],
                ['@babel/preset-react'],
              ],
              plugins: [],
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(
        getWebpackDefinePlugin({
          __CLIENT__: false,
          __SERVER__: true,
          __DEV__: !isProd,
          __PROD__: isProd,
        })
      ),
    ],
  }
}

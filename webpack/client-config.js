const webpack = require('webpack')
const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { getWebpackDefinePlugin } = require('./utils')
const { DEV_ASSETS_HOST, DEV_ASSETS_PORT, PROD_ASSETS_HOST, PROD_ASSETS_PORT } = require('../settings')

const emptyFunc = () => {}

module.exports = (env = {}) => {
  const isProd = !!env.prod
  const isAnalysis = !!env.analysis
  const mainEntry = ['./src/client/index.js']

  return {
    mode: isProd ? 'production' : 'development',
    stats: 'errors-warnings',
    target: 'web',
    entry: {
      main: mainEntry,
    },
    output: {
      path: path.resolve(__dirname, '../dist/client/assets'),
      filename: 'bundle-[contenthash].js',
      chunkFilename: '[id].[chunkhash].js',
      publicPath: isProd
        ? `http://${PROD_ASSETS_HOST}:${PROD_ASSETS_PORT}/`
        : `http://${DEV_ASSETS_HOST}:${DEV_ASSETS_PORT}/`,
    },
    resolve: {
      alias: {
        '@settings': path.resolve(__dirname, '../settings.js'),
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@reducers': path.resolve(__dirname, '../src/reducers'),
        '@actions': path.resolve(__dirname, '../src/actions'),
        '@hooks': path.resolve(__dirname, '../src/hooks'),
        '@dist': path.resolve(__dirname, '../dist'),
      },
      extensions: ['.js'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: isProd ? 'defaults, not ie 11' : { chrome: 87 } }],
                ['@babel/preset-react'],
              ],
              plugins: [
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-syntax-dynamic-import',
                // ['@babel/plugin-transform-runtime', { corejs: 3 }],
              ],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(
        getWebpackDefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEV__: !isProd,
          __PROD__: isProd,
        })
      ),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].[chunkhash].css',
      }),
      new AssetsPlugin({
        removeFullPathAutoPrefix: true,
        filename: './dist/server/assets.json',
        fileTypes: ['js', 'css'],
      }),
      !isProd ? new webpack.HotModuleReplacementPlugin() : emptyFunc,
      isProd ? new CompressionPlugin() : emptyFunc,
      isAnalysis ? new BundleAnalyzerPlugin() : emptyFunc,
    ],
    devtool: !isProd ? 'cheap-module-source-map' : 'hidden-cheap-module-source-map',
  }
}

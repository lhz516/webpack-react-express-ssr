/**
 * Webpack requires string type for every key here
 *
 * @param {Object} envObj An object of environment variables
 * @returns {Object} Used for passing into webpack.DefinePlugin
 */
function getWebpackDefinePlugin(envObj = {}) {
  for (const key in envObj) {
    envObj[key] = JSON.stringify(envObj[key])
  }
  return envObj
}

module.exports = {
  getWebpackDefinePlugin,
}

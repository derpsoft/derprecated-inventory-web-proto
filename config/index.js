// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    api: 'https://inventory-api-pro.azurewebsites.net'
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {},
    api: 'https://inventory-api-dev.azurewebsites.net'
    // api: 'http://192.168.0.7:3413'
  }
}

// see http://vuejs-templates.github.io/webpack for documentation.
var _ = require('lodash');
var path = require('path')

const base = {
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  assetsRoot: path.resolve(__dirname, '../dist'),
  autoOpenBrowser: false,
  proxyTable: {},
  bundleAnalyzerReport: process.env.npm_config_report,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
};

const pro = _.merge(base, {
  env: require('./prod.env'),
  index: path.resolve(__dirname, '../dist/index.html'),
  cssSourceMap: true,
  api: 'https://inventory-api-pro.azurewebsites.net',
});

const build = _.merge(base, pro, {});

const sta = _.merge(base, pro, {
  env: require('./sta.env'),
  api: 'https://inventory-api-sta.azurewebsites.net',
});

const local = _.merge(base, {
  env: require('./dev.env'),
  port: 8080,
  autoOpenBrowser: true,
  cssSourceMap: false,
  api: 'http://192.168.0.7:3413',
});

const dev = _.merge(base, local, {
  api: 'https://inventory-api-dev.azurewebsites.net',
});

const configs = {
  'production': pro,
  'local': local,
  'development': dev,
  'staging': sta,
};

module.exports = (function(env){
  return configs[env];
})(process.env.NODE_ENV || 'development');

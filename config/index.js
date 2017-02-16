// see http://vuejs-templates.github.io/webpack for documentation.
var _ = require('lodash');
var path = require('path');

const base = {
  assetsPublicPath: '/',
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  autoOpenBrowser: false,
  bundleAnalyzerReport: process.env.npm_config_report,
  cssSourceMap: false,
  env: {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    APPINSIGHTS_INSTRUMENTATIONKEY: JSON.stringify('cbaf9617-1418-417b-a69f-2084f3ade0e3'),
  },
  port: 8080,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  proxyTable: {},
};

const pro = _.merge({}, base, {
  api: 'https://inventory-api-pro.azurewebsites.net',
  cssSourceMap: true,
  index: path.resolve(__dirname, '../dist/index.html'),
});

const build = _.merge({}, pro, {});

const sta = _.merge({}, pro, {
  api: 'https://inventory-api-sta.azurewebsites.net',
});

const local = _.merge({}, base, {
  api: 'http://192.168.0.32:5000',
  autoOpenBrowser: true,
  cssSourceMap: false,
});

const dev = _.merge({}, local, {
  api: '//inventory-api-dev.azurewebsites.net',
});

const configs = {
  'production': pro,
  'local': local,
  'development': dev,
  'staging': sta,
  'testing': pro,
};

module.exports = configs[process.env.NODE_ENV || 'development'];

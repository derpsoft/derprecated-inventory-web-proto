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
  app: {
    orderPrefix: 'DERP',
  },
  auth0: {
    clientId: 'HgdpKajxywOUlc52Uv6rASdiABMsnYd4',
    domain: 'derprecated.auth0.com',
    scope: 'openid user_metadata app_metadata',
    audience: 'https://inventory.derprecated.com/',
    userManagementDashboard: 'https://derprecated.us.webtask.io/auth0-delegated-admin/users',
  },
  stripe: {
    publishableKey: 'pk_test_rHkL66ikBDq2X6WT3NYJDx4W',
  },
};

const pro = _.merge({}, base, {
  api: 'https://inventory-api-pro.azurewebsites.net',
  cssSourceMap: true,
  index: path.resolve(__dirname, '../dist/index.html'),
  env: {
    APPINSIGHTS_INSTRUMENTATIONKEY: JSON.stringify('6c7d6219-60d2-44d0-9173-fe8e8e46c2ea'),
  },
  stripe: {
    publishableKey: '',
  },
});

const build = _.merge({}, pro, {});

const sta = _.merge({}, pro, {
  api: 'https://inventory-api-sta.azurewebsites.net',
  env: {
    APPINSIGHTS_INSTRUMENTATIONKEY: JSON.stringify('da2f726a-8f62-40ca-a6d3-2374c714aa3b'),
  },
});

const local = _.merge({}, base, {
  api: 'http://0.0.0.0:5000',
  autoOpenBrowser: true,
  cssSourceMap: false,
});

const dev = _.merge({}, local, {
  api: 'https://inventory-api-dev.azurewebsites.net',
});

const configs = {
  'production': pro,
  'local': local,
  'development': dev,
  'staging': sta,
  'testing': pro,
};

module.exports = configs[process.env.NODE_ENV || 'development'];

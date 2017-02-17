// This is the webpack config used for unit tests.

var utils = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var config = require('../config');

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules: [{
      test: /\.less$/,
      loader: 'ignore-loader',
    }].concat(utils.styleLoaders())
  },
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env,
    }),
  ]
})

// no need for app entry during karma tests
// (will error if trying to run the site with NODE_ENV set to "testing"),
// comment next line to prevent
delete webpackConfig.entry;

module.exports = webpackConfig;

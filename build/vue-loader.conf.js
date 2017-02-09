var utils = require('./utils');
var config = require('../config');
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: config.cssSourceMap,
    extract: isProduction,
  }),
  postcss: [
    require('postcss-cssnext')(),
    require('postcss-nested')(),
    // require('autoprefixer')({
    //   browsers: ['last 2 versions']
    // })
  ]
};

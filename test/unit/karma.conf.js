// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.testing.conf');

module.exports = function(config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    // browsers: ['PhantomJS'],
    browsers: ['Chrome'],
    frameworks: ['mocha', 'sinon-chai', 'fixture'],
    reporters: ['spec', 'coverage'],
    files: [
      '../../node_modules/babel-polyfill/dist/polyfill.js',
      './index.js'
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: false,
      suppressFailed: false,
      suppressPassed: true,
      suppressSkipped: false,
      showSpecTiming: false,
      failFast: false,
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [{
          type: 'lcov',
          subdir: '.'
        },
        {
          type: 'text-summary'
        }
      ]
    },
  });
};

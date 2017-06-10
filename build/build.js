// https://github.com/shelljs/shelljs
require('./check-versions')();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var ora = require('ora');
var path = require('path');
var chalk = require('chalk');
var shell = require('shelljs');
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.' + process.env.NODE_ENV + '.conf');

var spinner = ora('building for ' + process.env.NODE_ENV + '...')
spinner.start();

console.log(chalk.cyan(`Building the ${process.env.NODE_ENV} environment \n`));

var assetsPath = path.join(config.assetsRoot, config.assetsSubDirectory);
shell.rm('-rf', assetsPath);
shell.mkdir('-p', assetsPath);
shell.config.silent = true;
shell.cp('-R', 'static/*', assetsPath);
shell.config.silent = false;

if (process.env.NODE_ENV !== 'local') {
  console.log(chalk.cyan(' Running Flow Typed... \n'));
  shell.exec('yarn run flow-typed install');
}


webpack(webpackConfig, function(err, stats) {
  spinner.stop();
  if (err) {
    throw err;
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  console.log(chalk.cyan('  Build complete.\n'));
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ));
})

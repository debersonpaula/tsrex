'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const loadConfigFile = require('./utils/loadConfigFile');
const chalk = require('chalk');

module.exports = (args, basePath) => new Promise((resolve, reject) => {
  // get config filename
  const configFile = args[0];

  // load configutation react data
  const configReactData = loadConfigFile(configFile);

  // load webpack config default
  const configWebpack = require('../config/webpack.config');
  const configDevServer = require('../config/webpackDevServer.config');

  // webpack config
  const config = configWebpack('development', basePath, configReactData);

  // create compiler
  let compiler;
  try {
    compiler = webpack(config);
  } catch (err) {
    console.log(chalk.red("==========================================================="));
    console.log(chalk.red('COMPILATION ERROR: '))
    console.log(chalk.red(err.message || err));
    console.log(chalk.red("==========================================================="));
    return reject();
  }

  // create web dev server
  const cfgdev = configDevServer(configReactData.host, false, configReactData.devServer);
  const devServer = new WebpackDevServer(compiler, cfgdev);
  const port = configReactData.port;
  const hostname = configReactData.host;

  // start web dev server
  devServer.listen(port, hostname, error => {
    if (error) {
      return reject(error);
    }
    console.log('===========================================================');
    console.log(`STARTED WEB DEV SERVER ON ${hostname}:${port}`);
    console.log('===========================================================');

    resolve();
  });
});
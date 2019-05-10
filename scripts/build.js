'use strict';

const webpack = require('webpack');
const loadConfigFile = require('./utils/loadConfigFile');
const chalk = require('chalk');

module.exports = (args, basePath) => new Promise((resolve, reject) => {
  // get config filename
  const configFile = args[0];

  // load configutation react data
  const configReactData = loadConfigFile(configFile);

  // load webpack config default
  const configWebpack = require('../config/webpack.config');

  // webpack config
  const config = configWebpack('production', basePath, configReactData);

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

  compiler.run((err, stats) => {
    // check for fatal errors
    if (err) {
      console.log(chalk.red("==========================================================="));
      console.log(chalk.red('FALTAL ERROR: '))
      console.log(err.stack || err);
      if (err.details) {
        console.log(err.details);
      }
      console.log(chalk.red("==========================================================="));
      return reject();
    }

    const info = stats.toJson();

    // check for compilation errors
    if (stats.hasErrors()) {
      console.log(chalk.red("==========================================================="));
      console.log(chalk.red('BUILD ERROR: '))
      info.errors.forEach(item => {
        console.log()
        console.log(chalk.red(item));
      });
      console.log(chalk.red("==========================================================="));
      return reject();
    }
    // check for compilation warnings
    if (stats.hasWarnings()) {
      console.log(chalk.yellow("==========================================================="));
      console.log(chalk.yellow('BUILD WARNINGS: '))
      console.log(chalk.yellow(info.warnings));
      console.log(chalk.yellow("==========================================================="));
    }

    console.log("===========================================================");
    const resultTime = stats.endTime - stats.startTime;
    console.log(`BUILD FINISHED IN - ${resultTime / 1000}s`);
    console.log("===========================================================");

    resolve();
  });
});
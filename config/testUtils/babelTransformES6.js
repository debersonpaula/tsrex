'use strict';

const babelJest = require('babel-jest');

const babelConfig = babelJest.createTransformer({
  babelrc: false,
  configFile: false,
  presets: ['@babel/preset-env'],
});

module.exports = babelConfig;

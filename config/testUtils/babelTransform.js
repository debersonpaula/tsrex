'use strict';

const babelJest = require('babel-jest');

const babelConfig = babelJest.createTransformer({
  babelrc: false,
  configFile: false,
  presets: [
    '@babel/react',
    '@babel/typescript',
    ['@babel/env', { modules: false }]
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread',
    'transform-es2015-modules-commonjs'
  ]
});

module.exports = babelConfig;

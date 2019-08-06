module.exports = require('babel-jest').createTransformer({
  babelrc: false,
  configFile: false,
  presets: ['@babel/preset-env'],
});

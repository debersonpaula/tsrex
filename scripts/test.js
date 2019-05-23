'use strict';

const loadConfigFile = require('./utils/loadConfigFile');
const jest = require('jest');
const merge = require('deepmerge');

module.exports = (args, basePath) => {
  // get config filename
  const configFile = args[0];

  // load configutation react data
  const configReactData = loadConfigFile(configFile);

  // load jest config
  const jestBaseOptions = require('../config/testUtils/jest.base')(
    configReactData.source
  );

  let jestOptions = jestBaseOptions;

  if (configReactData.jest) {
    jestOptions = merge(jestBaseOptions, configReactData.jest);
  }


  // run tests
  return jest.runCLI(jestOptions, [basePath]);
};

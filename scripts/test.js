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

  let jestOptions = configReactData.jest ? merge(jestBaseOptions, configReactData.jest) : jestBaseOptions;

  // stringify the modules to be accepted in jest run cli
  jestOptions.moduleNameMapper = JSON.stringify(jestOptions.moduleNameMapper);

  // run tests
  return jest.runCLI(jestOptions, [basePath]);
};

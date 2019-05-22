'use strict';

const loadConfigFile = require('./utils/loadConfigFile');
const jest = require('jest');

module.exports = (args, basePath) => {
  // get config filename
  const configFile = args[0];

  // load configutation react data
  const configReactData = loadConfigFile(configFile);

  // load jest config
  const jestOptions = require('../config/testUtils/jest.base')(
    configReactData.source
  );

  if (configReactData.jest) {
    Object.assign(jestOptions, configReactData.jest);
  }


  // run tests
  return jest.runCLI(jestOptions, [basePath]);
};

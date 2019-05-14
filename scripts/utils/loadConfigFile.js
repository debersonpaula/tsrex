'use strict';

const fs = require('fs');
const path = require("path");

/**
 * Load configuration file
 * @param {*} filename
 */
module.exports = function loadConfigFile(filename) {
  const configFileName = path.resolve(process.cwd(), filename);
  if (fs.existsSync(configFileName)) {
    const configObject = require(configFileName);
    return {
      source: configObject.source,
      port: configObject.port || 8080,
      host: configObject.host || '0.0.0.0',
      nodeEnv: configObject.nodeEnv,
      htmlEnv: configObject.htmlEnv,
      outputPath: configObject.outputPath,
      library: configObject.library,
    };
  } else {
    throw new Error(`Configuration file "${configFileName}" does not exists.`);
  }
}
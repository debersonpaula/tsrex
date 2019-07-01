const fs = require('fs');
const path = require("path");

/**
 * Load configuration file
 * @param {*} filename
 */
module.exports = function loadConfigFile(filename) {
  const configFileName = path.resolve(process.cwd(), filename);
  if (fs.existsSync(configFileName)) {
    const configObjectRaw = fs.readFileSync(configFileName);
    const configObject = eval(configObjectRaw.toString());

    return {
      source: configObject.source,
      port: configObject.port || 8080,
      host: configObject.host || '0.0.0.0',
      nodeEnv: configObject.nodeEnv,
      htmlEnv: configObject.htmlEnv,
      outputPath: configObject.outputPath,
      library: configObject.library,
      jest: configObject.jest,
      outputStatic: configObject.outputStatic,
      devServer: configObject.devServer,
      reactHotLoader: configObject.reactHotLoader,
      plugins: configObject.plugins
    };
  } else {
    throw new Error(`Configuration file "${configFileName}" does not exists.`);
  }
}
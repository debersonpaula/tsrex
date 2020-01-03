import fs from 'fs';
import path from 'path';
import { ITSREXConfig } from './ITSREXConfig';

/**
 * Load configuration file
 */
export default function loadConfigFile(filename: string): ITSREXConfig {
  const configFileName = path.resolve(process.cwd(), filename);
  if (fs.existsSync(configFileName)) {
    const configObjectRaw = fs.readFileSync(configFileName);

    let configObject: ITSREXConfig;

    try {
      // tslint:disable-next-line: no-eval
      configObject = eval(configObjectRaw.toString());
    } catch (error) {
      throw new Error(`Configuration file "${configFileName}" does not .`);
    }

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
      plugins: configObject.plugins || [],
      webpack: configObject.webpack || {},
    };
  }
  throw new Error(`Configuration file "${configFileName}" does not exists.`);
}

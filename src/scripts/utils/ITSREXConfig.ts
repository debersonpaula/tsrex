import webpack = require('webpack');

type EnvKeyValues = { [key: string]: string };

interface ITSREXConfigBase {
  source: string;
  port: number;
  host: string;
  nodeEnv: EnvKeyValues;
  htmlEnv: EnvKeyValues;
  outputPath: string;
  library: boolean;
  jest: any;
  outputStatic: string;
  devServer: any;
  reactHotLoader: boolean;

  /**
   * OBSOLETE:
   * use webpack instead
   */
  plugins: any[];

  /**
   * Webpack customization
   * any properties define in this property
   * will override TSREX config
   */
  webpack: webpack.Configuration;
}

export type ITSREXConfig = Partial<ITSREXConfigBase>;

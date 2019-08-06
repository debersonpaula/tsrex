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
  plugins: any[];
}

export type ITSREXConfig = Partial<ITSREXConfigBase>;

import { babelPresets } from '../utils/babelPresets';
import { EnvType } from '../interfaces/envType';
import { RuleSetRule } from 'webpack';
import { babelPlugins } from '../utils/babelPlugins';

/**
 * Process application JS with Babel.
 * The preset includes JSX, Flow, TypeScript, and some ESnext features.
 */
export const babelLoader = (
  env: EnvType,
  reactHotLoader: boolean
): RuleSetRule => ({
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  loader: 'babel-loader',
  options: {
    babelrc: false,
    configFile: false,
    presets: babelPresets(env),
    plugins: babelPlugins(env, reactHotLoader),
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
    // See #6846 for context on why cacheCompression is disabled
    cacheCompression: false,
    compact: env === 'production',
  },
});

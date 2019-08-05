import webpack from 'webpack';
import path from 'path';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { ITSREXConfig } from '../scripts/utils/ITSREXConfig';

import webpackOutputConfig from './output.config';

export default function(
  webpackEnv: 'production' | 'development',
  basePath: string,
  configReactData: ITSREXConfig
): webpack.Configuration {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const isEnvLibrary = configReactData.library;
  const isEnvStatic = configReactData.outputStatic != null;

  const sourcePath = path.resolve(basePath, configReactData.source);
  const nodeEnv = {
    isEnvDevelopment: isEnvDevelopment.toString(),
    isEnvProduction: isEnvProduction.toString(),
    NODE_ENV: webpackEnv,
    ...configReactData.nodeEnv,
  };

  const config: webpack.Configuration = {
    mode: webpackEnv,
    context: isEnvLibrary ? basePath : undefined,
    // ==== ENTRY ============================================================================
    entry: [
      isEnvDevelopment &&
        `webpack-dev-server/client?http://${configReactData.host}:${
          configReactData.port
        }`,
      isEnvDevelopment && 'webpack/hot/dev-server',
      path.join(sourcePath, 'index.tsx'),
    ].filter(Boolean),
    // ==== OUTPUT ===========================================================================
    output: webpackOutputConfig(webpackEnv, basePath, configReactData),
    // ==== MODULE ===========================================================================
    module: {
      // makes missing exports an error instead of warning
      strictExportPresence: true,

      rules: [
        {
          test: /\.(ts|tsx|js|jsx)?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              '@babel/react',
              '@babel/typescript',
              ['@babel/env', { modules: false }],
            ],
            plugins: [
              'babel-plugin-transform-typescript-metadata',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-object-rest-spread',
              configReactData.reactHotLoader && 'react-hot-loader/babel',
            ].filter(Boolean),
          },
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          exclude: [
            /\.html$/,
            /\.jsx?$/,
            /\.js?$/,
            /\.tsx?$/,
            /\.ts?$/,
            /\.css$/,
          ],
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    // ==== RESOLVE ===========================================================================
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsConfigPathsPlugin()],
      alias: configReactData.reactHotLoader
        ? {
            'react-dom': '@hot-loader/react-dom',
          }
        : {},
    },
    // ==== PLUGINS ===========================================================================
    plugins: [
      // HTML
      !isEnvLibrary &&
        !isEnvStatic &&
        new HTMLWebpackPlugin({
          template: path.join(sourcePath, 'index.html'),
          inject: true,
          ...configReactData.htmlEnv,
          ...(isEnvProduction && {
            minify: {
              collapseWhitespace: true,
              collapseInlineTagWhitespace: true,
              keepClosingSlash: true,
              minifyCSS: true,
              minifyJS: true,
            },
          }),
        }),

      // HOT RELOAD
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      // NODE ENV
      new webpack.EnvironmentPlugin(nodeEnv),
      // CLEARER
      isEnvProduction &&
        new CleanWebpackPlugin({
          dry: false,
          verbose: true,
          cleanOnceBeforeBuildPatterns: [
            path.join(basePath, configReactData.outputPath, '/**/*'),
          ],
        }),
      // BUNDLE ANALYSER
      isEnvProduction &&
        !isEnvLibrary &&
        !isEnvStatic &&
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        }),
      ...configReactData.plugins,
    ].filter(Boolean),
    // ==== OPTIMIZE ==========================================================================
    optimization: {
      splitChunks:
        isEnvLibrary || isEnvStatic
          ? undefined
          : {
              cacheGroups: {
                commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendor',
                  chunks: 'all',
                },
              },
            },
      minimize: true,
      minimizer: [
        new UglifyJsPlugin({
          cache: isEnvDevelopment,
          parallel: true,
          uglifyOptions: {
            compress: isEnvProduction,
            mangle: false,
            beautify: isEnvDevelopment,
          },
          sourceMap: isEnvDevelopment,
        }),
      ],
      usedExports: isEnvProduction,
      sideEffects: isEnvProduction,
    },
  };
  // ==== LIBRARY ==========================================================================
  if (isEnvLibrary) {
    config.externals = {
      redux: {
        commonjs: 'redux',
        commonjs2: 'redux',
        amd: 'redux',
        root: 'redux',
      },
      'react-redux': {
        commonjs: 'react-redux',
        commonjs2: 'react-redux',
        amd: 'react-redux',
        root: 'react-redux',
      },
      rxjs: {
        commonjs: 'rxjs',
        commonjs2: 'rxjs',
        amd: 'rxjs',
        root: 'rxjs',
      },
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'ReactDOM',
        root: 'ReactDOM',
      },
    };
  }

  if (isEnvDevelopment) {
    config.devtool = 'eval-source-map';
  }

  return config;
}

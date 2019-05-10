'use strict';

const path = require('path');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = function (
  webpackEnv,
  basePath,
  configReactData = {
    source: '',
    port: 0,
    host: '',
    outputPath: '',
    nodeEnv: {},
    htmlEnv: {},
  }
) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const sourcePath = path.resolve(basePath, configReactData.source);
  const nodeEnv = {
    isEnvDevelopment: isEnvDevelopment.toString(),
    isEnvProduction: isEnvProduction.toString(),
    ...configReactData.nodeEnv,
  };

  const config = {
    // ==== MODE =============================================================================
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    // ==== DEVTOOL ==========================================================================
    devtool: isEnvDevelopment && 'source-map',
    // ==== ENTRY ============================================================================
    entry: [
      isEnvDevelopment && `webpack-dev-server/client?http://${configReactData.host}:${
      configReactData.port
      }`,
      isEnvDevelopment && 'webpack/hot/dev-server',
      path.join(sourcePath, 'index.tsx'),
    ].filter(Boolean),
    // ==== OUTPUT ===========================================================================
    output: {
      // The build folder.
      path: isEnvProduction ? path.join(basePath, configReactData.outputPath) : undefined,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: isEnvDevelopment,
      // There will be one main bundle, and one file per asynchronous chunk.
      // In development, it does not produce real files.
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      // TODO: remove this when upgrading to webpack 5
      // futureEmitAssets: true,
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
          path
            .relative(configReactData, info.absoluteResourcePath)
            .replace(/\\/g, '/')
        : isEnvDevelopment &&
        (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    },
    // ==== MODULE ===========================================================================
    module: {
      // makes missing exports an error instead of warning
      strictExportPresence: true,

      rules: [
        // TS
        {
          test: /\.(ts|tsx)?$/,
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              '@babel/react',
              '@babel/typescript',
              ['@babel/env', { modules: false }]
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-object-rest-spread'
            ]
          }
        },
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          loader: require.resolve('file-loader'),
          // Exclude `js` files to keep "css" loader working as it injects
          // its runtime that would otherwise be processed through "file" loader.
          // Also exclude `html` and `json` extensions so they get processed
          // by webpacks internal loaders.
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        // ** STOP ** Are you adding a new loader?
        // Make sure to add the new loader(s) before the "file" loader.
      ],
    },
    // ==== RESOLVE ===========================================================================
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsConfigPathsPlugin()],
    },
    // ==== PLUGINS ===========================================================================
    plugins: [
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
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
          },
        }),
      }),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      new webpack.EnvironmentPlugin(nodeEnv),
      isEnvProduction && new CleanWebpackPlugin({
        dry: false,
        verbose: true,
        cleanOnceBeforeBuildPatterns: [path.join(basePath, configReactData.outputPath, '/**/*')],
      }),
      isEnvProduction && new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false
      })
    ].filter(Boolean),
    // ==== OPTIMIZE ==========================================================================
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all"
          }
        }
      },
      minimize: true,
      minimizer: [
        new UglifyJsPlugin({
          cache: isEnvDevelopment,
          parallel: true,
          uglifyOptions: {
            compress: isEnvProduction,
            mangle: false,
            beautify: isEnvDevelopment
          },
          sourceMap: isEnvDevelopment
        })
      ],
      usedExports: isEnvProduction,
      sideEffects: isEnvProduction
    }
  };

  return config;
};

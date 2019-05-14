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
    library: false
  }
) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  const isEnvLibrary = configReactData.library;
  const sourcePath = path.resolve(basePath, configReactData.source);
  const nodeEnv = {
    isEnvDevelopment: isEnvDevelopment.toString(),
    isEnvProduction: isEnvProduction.toString(),
    ...configReactData.nodeEnv,
  };

  const config = {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    devtool: isEnvDevelopment && 'source-map',
    context: isEnvLibrary ? basePath : undefined,
    // ==== ENTRY ============================================================================
    entry: [
      isEnvDevelopment && `webpack-dev-server/client?http://${configReactData.host}:${
      configReactData.port
      }`,
      isEnvDevelopment && 'webpack/hot/dev-server',
      path.join(sourcePath, 'index.tsx'),
    ].filter(Boolean),
    // ==== OUTPUT ===========================================================================
    output: require('./helpers/output.config')(isEnvDevelopment, isEnvProduction, isEnvLibrary, basePath, configReactData.outputPath),
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
      !isEnvLibrary && new HTMLWebpackPlugin({
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
      isEnvProduction && !isEnvLibrary && new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false
      })
    ].filter(Boolean),
    // ==== OPTIMIZE ==========================================================================
    optimization: {
      splitChunks: isEnvLibrary ? undefined : {
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
  // ==== LIBRARY ==========================================================================
  if (isEnvLibrary) {
    config.externals = {
      redux: {
        commonjs: "redux",
        commonjs2: "redux",
        amd: "redux",
        root: "redux"
      },
      "react-redux": {
        commonjs: "react-redux",
        commonjs2: "react-redux",
        amd: "react-redux",
        root: "react-redux"
      },
      rxjs: {
        commonjs: "rxjs",
        commonjs2: "rxjs",
        amd: "rxjs",
        root: "rxjs"
      },
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
      },
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "ReactDOM",
        root: "ReactDOM"
      }
    }
  }

  return config;
};

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
    library: false,
    outputStatic: null,
    reactHotLoader: false
  }
) {
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
    output: require('./helpers/output.config')(webpackEnv, basePath, configReactData),
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
              ['@babel/env', { modules: false }]
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-object-rest-spread',
              configReactData.reactHotLoader && 'react-hot-loader/babel'
            ].filter(Boolean)
          }
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          exclude: [/\.html$/, /\.jsx?$/, /\.js?$/, /\.tsx?$/, /\.ts?$/, /\.css$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/media/[name].[hash:8].[ext]',
          },
        }
      ],
    },
    // ==== RESOLVE ===========================================================================
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsConfigPathsPlugin()],
      alias: configReactData.reactHotLoader ? {
        'react-dom': '@hot-loader/react-dom'
      } : {}
    },
    // ==== PLUGINS ===========================================================================
    plugins: [
      !isEnvLibrary && !isEnvStatic && new HTMLWebpackPlugin({
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
      isEnvProduction && !isEnvLibrary && !isEnvStatic && new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false
      })
    ].filter(Boolean),
    // ==== OPTIMIZE ==========================================================================
    optimization: {
      splitChunks: isEnvLibrary || isEnvStatic ? undefined : {
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

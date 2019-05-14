'use strict';

const path = require('path');

const getOutput = (isEnvDevelopment, isEnvProduction, isEnvLibrary, basePath, outputPath) => {
  if (isEnvLibrary) {
    return {
      filename: "index.js",
      path: path.join(basePath, outputPath),
      libraryTarget: "umd",
      umdNamedDefine: true
    }
  }

  return {
    // The build folder.
    path: isEnvProduction ? path.join(basePath, outputPath) : undefined,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: isEnvDevelopment,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].js'
      : isEnvDevelopment && 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : isEnvDevelopment && 'static/js/[name].chunk.js',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: isEnvProduction
      ? info =>
        path
          .relative(basePath, info.absoluteResourcePath)
          .replace(/\\/g, '/')
      : isEnvDevelopment &&
      (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'))
  }
};

module.exports = getOutput;
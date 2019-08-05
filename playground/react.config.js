'use strict';
module.exports = {
  // source of files
  source: 'playground',
  // output path
  outputPath: 'dist',
  // port
  port: 8080,
  // hostname
  host: 'localhost',
  // all enviroments to be set in process.env
  nodeEnv: {
    comments: 'Comment from Node Enviroments',
    booleanValue: true,
    numericValue: 37
  },
  // all enviroments to be set in HTMLWebpackPlugin
  // available in HTML thru <%= htmlWebpackPlugin.options.propertyName %>
  htmlEnv: {
    htmlComments: 'Comment from HTML Enviroment'
  },
  // enable React Hot Loader
  reactHotLoader: true,

  jest: {
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
    updateSnapshot: true,
  },

  plugins: [
    // insert your webpack plugins here
  ],

  devServer: {
    open: true
  }
};

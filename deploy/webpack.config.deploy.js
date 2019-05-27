const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc. 
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
  mode: 'production',
  // ==== ENTRY ============================================================================
  entry: [
    path.join(__dirname, '../bin/tsrex.js'),
  ],
  // ==== OUTPUT ===========================================================================
  output: {
    path: path.join(__dirname, '../dist-bin'),
    filename: 'tsrex.js',
  },
  // ==== MODULE ===========================================================================
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /[\\/]node_modules[\\/]/
        ]
      }
    ],
  },
  // ==== RESOLVE ===========================================================================
  resolve: {
    extensions: ['.js']
  },
  // ==== PLUGINS ===========================================================================
  plugins: [
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../dist-bin', '/**/*')],
    }),

  ],
  // ==== OPTIMIZE ==========================================================================
  optimization: {
    minimize: true,
    usedExports: true,
  }
}

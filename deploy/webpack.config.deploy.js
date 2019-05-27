const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
var nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
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
      dry: false,
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

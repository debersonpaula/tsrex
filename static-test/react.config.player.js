var path = require('path');

module.exports = {
  // source of files
  source: 'static-test/player',
  outputPath: 'static-test/dist',
  host: 'localhost',

  devServer: {
    contentBase: path.resolve(process.cwd(), 'static-test/dist'),
    open: true
  }
};

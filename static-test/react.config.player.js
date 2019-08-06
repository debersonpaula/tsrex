var path = require('path');

module.exports = {
  // source of files
  source: 'static-test/player',

  devServer: {
    contentBase: path.resolve(process.cwd(), 'static-test/dist')
  }
};

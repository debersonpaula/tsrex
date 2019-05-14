'use strict';
module.exports = {
  // source of files
  source: './playground',
  // output path
  outputPath: 'dist',
  // all enviroments to be set in process.env
  nodeEnv: {
    comments: 'Comment from Node Enviroments',
    booleanValue: true,
    numericValue: 37
  },
  // library compilation mode
  library: true
};

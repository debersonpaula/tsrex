module.exports = {
  // source of files
  source: 'static-test/script',
  // output path
  outputPath: 'static-test/dist',
  // all enviroments to be set in process.env
  nodeEnv: {
    comments: 'Comment from Node Enviroments',
    booleanValue: true,
    numericValue: 37
  },
  // if outputStatic is set with a string
  // will be considered only the js as static
  // and the string will be the name of it
  // html will be not rendered
  outputStatic: 'playground.min',
};

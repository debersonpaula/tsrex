#!/usr/bin/env node
'use strict';

// Makes the script crash on unhandled rejections
process.on('unhandledRejection', err => {
  throw err;
});

const args = process.argv.slice(2);

const script = args[0];
const nodeArgs = args.slice(1);

switch (script) {
  case 'build':
  case 'start':
  case 'test': {
    const scriptHandler = require('../scripts/' + script);

    if (scriptHandler && typeof scriptHandler === 'function') {
      const result = scriptHandler(nodeArgs, process.cwd());

      result
        .then(() => {
          console.log('Finished script execution.');
        })
        .catch(() => {
          console.log('Script "' + script + '" executed with error.');
          process.exit(1);
        });
    } else {
      console.log('Script "' + script + '" does not have handle to execute.');
      process.exit(1);
    }

    break;
  }

  default:
    console.log('Unknown script "' + script + '".');
    process.exit(1);
    break;
}

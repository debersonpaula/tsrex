var fs = require('fs');
var path = require('path');

const binaryCaller = `#!/usr/bin/env node
require('./tsrex');`;
fs.writeFileSync(path.join(__dirname, '../dist-bin/index.js'), binaryCaller);

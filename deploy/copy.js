console.log('Copying script files...');
var fs = require('fs');
var path = require('path');

copyTestUtil('babelTransform');
copyTestUtil('babelTransformES6');
copyTestUtil('test-setup');
copyTestUtil('test-shim');
copyMocks('fileMock');
copyMocks('styleMock');
copyRoot('tsconfig.json');
copyRoot('tslint.json');
copyRoot('readme.md');
copyRoot('package.json');

const binaryCaller = `#!/usr/bin/env node
require('./tsrex');`;
fs.writeFileSync(path.join(__dirname, '../dist-bin/index.js'), binaryCaller);

// ===== UTILS =============================================================
function copyTestUtil(name) {
  fs.copyFileSync(path.join(__dirname, `../src/config/testUtils/${name}.js`), path.join(__dirname, `../dist-bin/${name}.js`));
}

function copyMocks(name) {
  fs.copyFileSync(path.join(__dirname, `../src/config/mocks/${name}.js`), path.join(__dirname, `../dist-bin/${name}.js`));
}

function copyRoot(name) {
  fs.copyFileSync(path.join(__dirname, `../${name}`), path.join(__dirname, `../dist-bin/${name}`));
}
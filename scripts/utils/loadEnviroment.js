'use strict';

module.exports = function loadEnviroment(envName) {
  try {
    return JSON.parse(process.env[envName]);
  } catch (e) {
    console.log(`Not possible to parse env=${envName}`);
    console.log(e);
    return undefined;
  }
}
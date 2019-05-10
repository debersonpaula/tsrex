'use strict';

module.exports = function saveEnviroment(obj, envName) {
  if (obj) {
    process.env[envName] = JSON.stringify(obj);
  } else {
    process.env[envName] = '';
  }
}
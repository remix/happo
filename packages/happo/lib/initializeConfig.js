'use strict';

/* eslint import/no-dynamic-require: 1 */
var fs = require('fs');
var path = require('path');

var defaultConfig = {
  bind: 'localhost',
  port: 4567,
  snapshotsFolder: 'snapshots',
  resultSummaryFilename: 'resultSummary.json',
  uploader: null,
  targets: []
};

var DEFAULT_CONFIG_FILE_LOCATION = '.happo.js';

function readUserConfig(configFilePath) {
  var file = path.resolve(process.cwd(), configFilePath);
  if (!fs.existsSync(file)) {
    if (configFilePath !== DEFAULT_CONFIG_FILE_LOCATION) {
      throw new Error('Config file does not exist: ' + String(configFilePath));
    }
    return {};
  }
  return require(file); // eslint-disable-line global-require
}

function initializeConfig(configFilePath) {
  return Object.assign(defaultConfig, readUserConfig(configFilePath || DEFAULT_CONFIG_FILE_LOCATION));
}
module.exports = initializeConfig;
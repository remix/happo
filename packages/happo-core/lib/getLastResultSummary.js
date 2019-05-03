'use strict';

var fs = require('fs');
var path = require('path');

var config = require('./config');

function getLastResultSummary() {
  var resultSummaryJSON = fs.readFileSync(path.join(config.get().snapshotsFolder, config.get().resultSummaryFilename), 'utf8');
  return JSON.parse(resultSummaryJSON);
}

module.exports = getLastResultSummary;
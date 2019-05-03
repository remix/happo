'use strict';

var fs = require('fs');
var path = require('path');
var config = require('./config');

function saveResultsToFile(runResult) {
  return new Promise(function (resolve, reject) {
    var resultToSerialize = Object.assign({
      generatedAt: Date.now()
    }, runResult);

    var pathToFile = path.join(config.get().snapshotsFolder, config.get().resultSummaryFilename);

    fs.writeFile(pathToFile, JSON.stringify(resultToSerialize), function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(resultToSerialize);
      }
    });
  });
}

module.exports = saveResultsToFile;
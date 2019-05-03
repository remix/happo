'use strict';

var areImagesEqual = require('./areImagesEqual');
var getImageFromStream = require('./getImageFromStream');
var getImageFromPath = require('./getImageFromPath');
var getImageFromDataURI = require('./getImageFromDataURI');
var getLastResultSummary = require('./getLastResultSummary');
var pathToSnapshot = require('./pathToSnapshot');
var RunResult = require('./RunResult');
var constructUrl = require('./constructUrl');
var saveResultsToFile = require('./saveResultsToFile');
var Constants = require('./Constants');
var config = require('./config');

module.exports = {
  config: config,
  areImagesEqual: areImagesEqual,
  getImageFromStream: getImageFromStream,
  getImageFromPath: getImageFromPath,
  getImageFromDataURI: getImageFromDataURI,
  getLastResultSummary: getLastResultSummary,
  pathToSnapshot: pathToSnapshot,
  RunResult: RunResult,
  constructUrl: constructUrl,
  saveResultsToFile: saveResultsToFile,
  Constants: Constants
};
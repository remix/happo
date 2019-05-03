'use strict';

var path = require('path');

var config = require('./config');

function pathToSnapshot(_ref) {
  var description = _ref.description,
      viewportName = _ref.viewportName,
      fileName = _ref.fileName;

  return path.join(config.get().snapshotsFolder, new Buffer(description).toString('base64'), '@' + String(viewportName), fileName);
}

module.exports = pathToSnapshot;
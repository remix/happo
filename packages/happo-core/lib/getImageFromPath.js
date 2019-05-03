'use strict';

var fs = require('fs');
var getImageFromStream = require('./getImageFromStream');

function getImageFromPath(fpath) {
  return getImageFromStream(fs.createReadStream(fpath));
}

module.exports = getImageFromPath;
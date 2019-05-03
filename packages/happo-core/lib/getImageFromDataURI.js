'use strict';

var parseDataUri = require('parse-data-uri');

var _require = require('pngjs'),
    PNG = _require.PNG;

function getImageFromDataURI(uri) {
  return new Promise(function (resolve, reject) {
    var img = parseDataUri(uri);
    var png = new PNG();
    png.parse(img.data, function (err) {
      if (err) reject(err);
      resolve(png);
    });
  });
}

module.exports = getImageFromDataURI;
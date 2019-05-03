'use strict';

var fs = require('fs');
var path = require('path');

var faviconAsBase64 = require('./faviconAsBase64');

var CSS_FILE_PATH = path.join(__dirname, '../public/happo-styles.css');
var JS_FILE_PATH = path.join(__dirname, '../public/HappoApp.bundle.js');

module.exports = function () {
  function prepareViewData(data) {
    return Object.assign({}, {
      favicon: faviconAsBase64,
      css: fs.readFileSync(CSS_FILE_PATH, 'utf8'),
      jsCode: fs.readFileSync(JS_FILE_PATH, 'utf8')
    }, data);
  }

  return prepareViewData;
}();
'use strict';

var config = require('./config');

module.exports = function () {
  function constructUrl(path) {
    return 'http://' + String(config.get().bind) + ':' + String(config.get().port) + String(path);
  }

  return constructUrl;
}();
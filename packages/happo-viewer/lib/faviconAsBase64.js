'use strict';

var fs = require('fs');
var path = require('path');

var base64 = new Buffer(fs.readFileSync(path.join(__dirname, '../public/favicon.ico'))).toString('base64');

module.exports = 'data:image/ico;base64,' + String(base64);
'use strict';

var _require = require('pngjs'),
    PNG = _require.PNG;

function getImageFromStream(stream) {
  return new Promise(function (resolve, reject) {
    stream.on('error', reject).pipe(new PNG()).on('error', reject).on('parsed', function () {
      function parsedCallback() {
        // `this` is bound to an object with the following properties:
        //    width (number)
        //    height (number)
        //    data (array of pixels, similar to what <canvas> uses)
        //    pack (function)
        //  }
        resolve(this);
      }

      return parsedCallback;
    }());
  });
}

module.exports = getImageFromStream;
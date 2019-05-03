'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = getImageData;
/**
 * Get data (pixels, width, height) about an image
 *
 * @param {String} src
 * @return {Promise}
 */
function getImageData(src) {
  return new Promise(function (resolve) {
    var imageObj = new Image();
    imageObj.onload = function () {
      var width = imageObj.width,
          height = imageObj.height;

      var canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      var context = canvas.getContext('2d');

      context.drawImage(imageObj, 0, 0);

      var data = context.getImageData(0, 0, width, height).data;
      resolve({ width: width, height: height, data: data });
    };
    imageObj.src = src;
  });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = getDiffPixel;

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _euclideanDistance = require('./euclideanDistance');

var _euclideanDistance2 = _interopRequireDefault(_euclideanDistance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var WHITE = [255, 255, 255, 255];

function getDiffPixel(previousPixel, currentPixel) {
  // Compute a score that represents the difference between 2 pixels
  //
  // This method simply takes the Euclidean distance between the RGBA channels
  // of 2 colors over the maximum possible Euclidean distance. This gives us a
  // percentage of how different the two colors are.
  //
  // Although it would be more perceptually accurate to calculate a proper
  // Delta E in Lab colorspace, we probably don't need perceptual accuracy for
  // this application, and it is nice to avoid the overhead of converting RGBA
  // to Lab.
  var diff = (0, _euclideanDistance2['default'])(previousPixel, currentPixel) / _euclideanDistance.MAX_EUCLIDEAN_DISTANCE;

  if (diff === 0) {
    return {
      diff: diff,
      pixel: (0, _compose2['default'])([currentPixel[0], currentPixel[1], currentPixel[2], 40], WHITE)
    };
  }

  return {
    diff: diff,
    pixel: (0, _compose2['default'])([179, 54, 130, 255 * Math.max(0.2, diff)], WHITE)
  };
}
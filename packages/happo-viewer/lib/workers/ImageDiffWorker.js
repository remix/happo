'use strict';

var _getDiffPixel2 = require('../getDiffPixel');

var _getDiffPixel3 = _interopRequireDefault(_getDiffPixel2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var GRAY = [100, 100, 100, 255];
var GREEN = [0, 200, 0, 255];
var RED = [255, 0, 0, 255];

var GUTTER_WIDTH = 20 * 4;
var GUTTER_GAP = 4 * 4;

function getDataIndex(row, width, index) {
  return GUTTER_WIDTH * (row + 1) + width * row + index;
}

self.addEventListener('message', function (_ref) {
  var _ref$data = _ref.data,
      previousImageData = _ref$data.previousImageData,
      currentImageData = _ref$data.currentImageData;

  var width = previousImageData[0].length;
  var height = previousImageData.length;

  var diffImageSize = (GUTTER_WIDTH + width) * height;

  var data = new Uint8ClampedArray(diffImageSize);

  for (var row = 0; row < height; row += 1) {
    // Render image
    var isRowChanged = false;
    for (var index = 0; index < width; index += 4) {
      var _getDiffPixel = (0, _getDiffPixel3['default'])([previousImageData[row][index], previousImageData[row][index + 1], previousImageData[row][index + 2], previousImageData[row][index + 3]], [currentImageData[row][index], currentImageData[row][index + 1], currentImageData[row][index + 2], currentImageData[row][index + 3]]),
          diff = _getDiffPixel.diff,
          pixel = _getDiffPixel.pixel;

      if (diff > 0) {
        isRowChanged = true;
      }

      var dataIndex = getDataIndex(row, width, index);
      data[dataIndex + 0] = pixel[0]; // r
      data[dataIndex + 1] = pixel[1]; // g
      data[dataIndex + 2] = pixel[2]; // b
      data[dataIndex + 3] = pixel[3]; // a
    }

    // Render gutter
    var gutterColor = void 0;
    if (previousImageData[row][3] === 0) {
      // Pixel is transparent in previous image, which means that a row was
      // added here.
      gutterColor = GREEN;
    } else if (currentImageData[row][3] === 0) {
      // Pixel is transparent in current image, which means that a row was
      // removed here.
      gutterColor = RED;
    } else if (isRowChanged) {
      gutterColor = GRAY;
    } else {
      gutterColor = null;
    }

    for (var _index = 0; _index < GUTTER_WIDTH - GUTTER_GAP; _index += 4) {
      if (gutterColor !== null) {
        var _dataIndex = getDataIndex(row, width, _index) - GUTTER_WIDTH;
        data[_dataIndex + 0] = gutterColor[0];
        data[_dataIndex + 1] = gutterColor[1];
        data[_dataIndex + 2] = gutterColor[2];
        data[_dataIndex + 3] = gutterColor[3];
      }
    }
  }

  self.postMessage({
    data: data,
    width: (GUTTER_WIDTH + width) / 4,
    height: height
  });

  self.close();
});
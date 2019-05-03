'use strict';

var _alignArrays = require('../alignArrays');

var _alignArrays2 = _interopRequireDefault(_alignArrays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function imageTo2DArray(_ref, paddingRight) {
  var data = _ref.data,
      width = _ref.width,
      height = _ref.height;

  // The imageData is a 1D array. Each element in the array corresponds to a
  // decimal value that represents one of the RGBA channels for that pixel.
  var rowSize = width * 4;

  var newData = [];
  for (var row = 0; row < height; row += 1) {
    var pixelsInRow = new Uint8ClampedArray(rowSize + paddingRight * 4);
    for (var location = 0; location < rowSize; location += 1) {
      pixelsInRow[location] = data[row * rowSize + location];
    }
    newData.push(pixelsInRow);
  }
  return newData;
}

function hashFn() {
  // Safari has a bug where trying to reference `btoa` inside a web worker will
  // result in an error, so we fall back to the slower (?) `JSON.stringify`. The
  // only way to prevent this seems to be by using a try/catch. We do this in its
  // own function to prevent our align function from being de-optimized.
  //
  // https://bugs.webkit.org/show_bug.cgi?id=158576
  try {
    // Firefox, for some reason, gives us the same string when feeding typed
    // arrays to `btoa`. Here, we can detect this behavior and fall back to the
    // slower (?) but more accurate `JSON.stringify`.
    if (btoa(new Uint8ClampedArray([0])) === btoa(new Uint8ClampedArray([1]))) {
      // Firefox
      return JSON.stringify;
    }
    return btoa;
  } catch (e) {
    return JSON.stringify;
  }
}

var HASH_FN = hashFn();

function align(_ref2) {
  var previousImageData = _ref2.previousImageData,
      currentImageData = _ref2.currentImageData,
      maxWidth = _ref2.maxWidth;

  var hashedPreviousData = previousImageData.map(HASH_FN);
  self.postMessage({ progress: 40 });
  var hashedCurrentData = currentImageData.map(HASH_FN);
  self.postMessage({ progress: 60 });

  (0, _alignArrays2['default'])(hashedPreviousData, hashedCurrentData);

  var transparentLine = new Uint8ClampedArray(maxWidth * 4);

  hashedPreviousData.forEach(function (hashedLine, i) {
    if (hashedLine === _alignArrays.PLACEHOLDER) {
      previousImageData.splice(i, 0, transparentLine);
    }
  });

  hashedCurrentData.forEach(function (hashedLine, i) {
    if (hashedLine === _alignArrays.PLACEHOLDER) {
      currentImageData.splice(i, 0, transparentLine);
    }
  });
}

/**
 * Takes two 2d images, computes the diff between the two, and injects pixels to
 * both in order to:
 * a) make both images the same height
 * b) properly visualize differences
 *
 * Please note that this method MUTATES data.
 *
 * @param {Array} previousData
 * @param {Array} currentData
 */
function computeAndInjectDiffs(_ref3) {
  var previousData = _ref3.previousData,
      currentData = _ref3.currentData;

  var maxWidth = Math.max(previousData.width, currentData.width);

  var previousImageData = imageTo2DArray(previousData, maxWidth - previousData.width);

  var currentImageData = imageTo2DArray(currentData, maxWidth - currentData.width);

  self.postMessage({ progress: 20 });

  align({
    previousImageData: previousImageData,
    currentImageData: currentImageData,
    maxWidth: maxWidth
  });

  self.postMessage({ progress: 85 });

  return {
    currentData: {
      data: currentImageData,
      height: currentImageData.length,
      width: maxWidth
    },
    previousData: {
      data: previousImageData,
      height: previousImageData.length,
      width: maxWidth
    }
  };
}

self.addEventListener('message', function (_ref4) {
  var _ref4$data = _ref4.data,
      previousData = _ref4$data.previousData,
      currentData = _ref4$data.currentData;

  var result = computeAndInjectDiffs({ previousData: previousData, currentData: currentData });
  self.postMessage(result);
  self.close();
});
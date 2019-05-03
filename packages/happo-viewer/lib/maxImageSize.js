"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = maxImageSize;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function maxImageSize() {
  for (var _len = arguments.length, imageUrls = Array(_len), _key = 0; _key < _len; _key++) {
    imageUrls[_key] = arguments[_key];
  }

  var dimensions = {};

  return new Promise(function (resolve, reject) {
    function handleImageError(e) {
      reject(e);
    }

    function handleImageLoad(index) {
      var width = this.width,
          height = this.height;

      // Use the index in case the URL is somehow duplicated.

      dimensions[index] = { width: width, height: height };

      if (Object.keys(dimensions).length >= imageUrls.length) {
        // We are done, so compute the max width and height and resolve.
        var values = Object.keys(dimensions).map(function (key) {
          return dimensions[key];
        });
        var maxWidth = Math.max.apply(Math, _toConsumableArray(values.map(function (value) {
          return value.width;
        })));
        var maxHeight = Math.max.apply(Math, _toConsumableArray(values.map(function (value) {
          return value.height;
        })));
        resolve({ width: maxWidth, height: maxHeight });
      }
    }

    imageUrls.forEach(function (url, i) {
      var image = new Image();
      image.onerror = handleImageError;
      image.onload = handleImageLoad.bind(image, i);
      image.src = url;
    });
  });
}
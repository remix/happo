"use strict";

function areImagesEqual(a, b) {
  if (a.height !== b.height) {
    return false;
  }
  if (a.width !== b.width) {
    return false;
  }
  var len = a.data.length;
  for (var i = 0; i < len; i += 1) {
    if (a.data[i] !== b.data[i]) {
      return false;
    }
  }
  return true;
}

module.exports = areImagesEqual;
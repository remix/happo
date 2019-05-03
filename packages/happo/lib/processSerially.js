"use strict";

module.exports = function () {
  function processSerially(items, fn) {
    var promises = [];
    items.reduce(function (prev, item) {
      var promise = prev.then(function () {
        return fn(item);
      });
      promises.push(promise);
      return promise;
    }, Promise.resolve());
    return Promise.all(promises);
  }

  return processSerially;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RunResult = function () {
  function RunResult() {
    _classCallCheck(this, RunResult);

    this.newImages = [];
    this.diffImages = [];
  }

  _createClass(RunResult, [{
    key: 'add',
    value: function () {
      function add(_ref) {
        var result = _ref.result,
            description = _ref.description,
            height = _ref.height,
            viewportName = _ref.viewportName;

        if (result === 'equal') {
          return;
        }
        this[String(result) + 'Images'].push({
          description: description,
          height: height,
          viewportName: viewportName
        });
      }

      return add;
    }()
  }, {
    key: 'merge',
    value: function () {
      function merge(runResult) {
        var _newImages, _diffImages;

        (_newImages = this.newImages).push.apply(_newImages, _toConsumableArray(runResult.newImages));
        (_diffImages = this.diffImages).push.apply(_diffImages, _toConsumableArray(runResult.diffImages));
      }

      return merge;
    }()
  }]);

  return RunResult;
}();

module.exports = RunResult;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactWaypoint = require('react-waypoint');

var _reactWaypoint2 = _interopRequireDefault(_reactWaypoint);

var _SmoothProgress = require('./SmoothProgress');

var _SmoothProgress2 = _interopRequireDefault(_SmoothProgress);

var _getImageData = require('./getImageData');

var _getImageData2 = _interopRequireDefault(_getImageData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageDiffWorker = require('worker?inline!./workers/ImageDiffWorker'); // eslint-disable-line
var ComputeAndInjectDiffsWorker = require('worker?inline!./workers/ComputeAndInjectDiffsWorker'); // eslint-disable-line

var LCSDiff = function (_React$Component) {
  _inherits(LCSDiff, _React$Component);

  function LCSDiff(props) {
    _classCallCheck(this, LCSDiff);

    var _this = _possibleConstructorReturn(this, (LCSDiff.__proto__ || Object.getPrototypeOf(LCSDiff)).call(this, props));

    _this.state = {
      progress: 0,
      width: 0,
      height: 0
    };
    _this.initialize = _this.initialize.bind(_this);
    return _this;
  }

  _createClass(LCSDiff, [{
    key: 'initialize',
    value: function () {
      function initialize() {
        var _this2 = this;

        var _props = this.props,
            previous = _props.previous,
            current = _props.current;


        Promise.all([(0, _getImageData2['default'])(previous), (0, _getImageData2['default'])(current)]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              previousData = _ref2[0],
              currentData = _ref2[1];

          _this2.setState({
            progress: 10,
            width: previousData.width,
            height: previousData.height
          });
          _this2.computeDiffs({
            previousData: previousData,
            currentData: currentData
          });
        });
      }

      return initialize;
    }()
  }, {
    key: 'computeDiffs',
    value: function () {
      function computeDiffs(_ref3) {
        var _this3 = this;

        var previousData = _ref3.previousData,
            currentData = _ref3.currentData;

        var worker = new ComputeAndInjectDiffsWorker();
        worker.addEventListener('message', function (_ref4) {
          var _ref4$data = _ref4.data,
              newPreviousData = _ref4$data.previousData,
              newCurrentData = _ref4$data.currentData,
              progress = _ref4$data.progress;

          if (!newPreviousData) {
            // This is only a progress message, not the final results
            _this3.setState({ progress: progress });
            return;
          }

          // At this point, images are of same width
          _this3.setState({
            width: newPreviousData.width,
            height: newPreviousData.height
          });

          _this3.constructDiffImage({
            previousData: newPreviousData,
            currentData: newCurrentData
          });
        });
        worker.postMessage({ previousData: previousData, currentData: currentData });
      }

      return computeDiffs;
    }()
  }, {
    key: 'constructDiffImage',
    value: function () {
      function constructDiffImage(_ref5) {
        var _this4 = this;

        var previousData = _ref5.previousData,
            currentData = _ref5.currentData;

        var worker = new ImageDiffWorker();
        worker.addEventListener('message', function (_ref6) {
          var _ref6$data = _ref6.data,
              data = _ref6$data.data,
              width = _ref6$data.width,
              height = _ref6$data.height;

          _this4.setState({ progress: 99, width: width, height: height });
          var context = _this4.canvas.getContext('2d');
          var diffImage = context.createImageData(width, height);
          diffImage.data.set(data);
          context.putImageData(diffImage, 0, 0);
          _this4.setState({ progress: 100 });
        });
        worker.postMessage({
          previousImageData: previousData.data,
          currentImageData: currentData.data
        });
      }

      return constructDiffImage;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _this5 = this;

        var _state = this.state,
            width = _state.width,
            height = _state.height,
            progress = _state.progress;


        return _react2['default'].createElement(
          'div',
          {
            style: {
              height: height,
              width: width
            }
          },
          progress > 0 && progress < 100 && _react2['default'].createElement(_SmoothProgress2['default'], {
            value: progress
          }),
          progress === 0 && _react2['default'].createElement(_reactWaypoint2['default'], {
            onEnter: this.initialize,
            scrollableAncestor: window,
            bottomOffset: '-50%',
            topOffset: '-70%'
          }),
          _react2['default'].createElement('canvas', {
            ref: function () {
              function ref(node) {
                _this5.canvas = node;
              }

              return ref;
            }(),
            width: width,
            height: height
          })
        );
      }

      return render;
    }()
  }]);

  return LCSDiff;
}(_react2['default'].Component);

exports['default'] = LCSDiff;

LCSDiff.propTypes = {
  previous: _react.PropTypes.string.isRequired,
  current: _react.PropTypes.string.isRequired
};
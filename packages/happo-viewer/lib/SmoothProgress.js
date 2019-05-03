'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HIDE_MS = 500;

var SmoothProgress = function (_React$PureComponent) {
  _inherits(SmoothProgress, _React$PureComponent);

  function SmoothProgress(props) {
    _classCallCheck(this, SmoothProgress);

    var _this = _possibleConstructorReturn(this, (SmoothProgress.__proto__ || Object.getPrototypeOf(SmoothProgress)).call(this, props));

    _this.state = {
      currentValue: 0,
      visible: false
    };
    _this.tick = _this.tick.bind(_this);
    _this.tick(0);
    setTimeout(function () {
      _this.setState({ visible: true });
    }, HIDE_MS);
    return _this;
  }

  _createClass(SmoothProgress, [{
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        clearTimeout(this.timeout);
        this.tick(nextProps.value);
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'tick',
    value: function () {
      function tick(targetValue) {
        var _this2 = this;

        var currentValue = this.state.currentValue;

        var diff = targetValue - currentValue;
        this.setState({
          currentValue: currentValue + diff * 0.8
        });

        this.timeout = setTimeout(function () {
          _this2.tick(targetValue);
        }, 1000);
      }

      return tick;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _state = this.state,
            currentValue = _state.currentValue,
            visible = _state.visible;


        return _react2['default'].createElement(
          'div',
          {
            style: {
              opacity: visible ? 1 : 0
            },
            className: 'SmoothProgress'
          },
          _react2['default'].createElement('div', {
            style: {
              transform: 'translateX(-' + (100 - currentValue) + '%)'
            },
            className: 'SmoothProgress__bar'
          })
        );
      }

      return render;
    }()
  }]);

  return SmoothProgress;
}(_react2['default'].PureComponent);

exports['default'] = SmoothProgress;

SmoothProgress.propTypes = {
  value: _react.PropTypes.number.isRequired
};
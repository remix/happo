'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _maxImageSize = require('./maxImageSize');

var _maxImageSize2 = _interopRequireDefault(_maxImageSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Swiper = function (_React$Component) {
  _inherits(Swiper, _React$Component);

  function Swiper(props) {
    _classCallCheck(this, Swiper);

    var _this = _possibleConstructorReturn(this, (Swiper.__proto__ || Object.getPrototypeOf(Swiper)).call(this, props));

    _this.state = {
      cursorLeft: 0,
      height: 'auto',
      width: 'auto'
    };
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    return _this;
  }

  _createClass(Swiper, [{
    key: 'componentWillMount',
    value: function () {
      function componentWillMount() {
        var _this2 = this;

        this.updateSize(this.props).then(function (_ref) {
          var width = _ref.width;

          // Start in the center
          _this2.setState({ cursorLeft: width / 2 });
        });
      }

      return componentWillMount;
    }()
  }, {
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        this.updateSize(nextProps);
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'updateSize',
    value: function () {
      function updateSize(_ref2) {
        var _this3 = this;

        var current = _ref2.current,
            previous = _ref2.previous;

        var sizes = (0, _maxImageSize2['default'])(current, previous).then(function (_ref3) {
          var width = _ref3.width,
              height = _ref3.height;

          _this3.setState({ width: width, height: height });
          return { width: width, height: height };
        });

        return Promise.resolve(sizes);
      }

      return updateSize;
    }()
  }, {
    key: 'handleMouseMove',
    value: function () {
      function handleMouseMove(event) {
        this.setState({
          cursorLeft: event.pageX - event.target.offsetLeft
        });
      }

      return handleMouseMove;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props = this.props,
            previous = _props.previous,
            current = _props.current;
        var _state = this.state,
            cursorLeft = _state.cursorLeft,
            height = _state.height,
            width = _state.width;


        return _react2['default'].createElement(
          'div',
          {
            className: 'Swiper',
            style: { height: height, width: width },
            onMouseMove: this.handleMouseMove
          },
          _react2['default'].createElement(
            'div',
            {
              className: 'Swiper__image',
              style: { width: cursorLeft }
            },
            _react2['default'].createElement('img', {
              src: previous,
              role: 'presentation'
            })
          ),
          _react2['default'].createElement(
            'div',
            {
              className: 'Swiper__image',
              style: {
                transform: 'translateX(' + String(cursorLeft) + 'px)',
                width: width - cursorLeft
              }
            },
            _react2['default'].createElement('img', {
              src: current,
              style: {
                transform: 'translateX(-' + String(cursorLeft) + 'px)'
              },
              role: 'presentation'
            })
          ),
          _react2['default'].createElement('div', {
            className: 'Swiper__cursor',
            style: {
              transform: 'translateX(' + String(cursorLeft) + 'px)'
            }
          })
        );
      }

      return render;
    }()
  }]);

  return Swiper;
}(_react2['default'].Component);

exports['default'] = Swiper;

Swiper.propTypes = {
  previous: _react.PropTypes.string.isRequired,
  current: _react.PropTypes.string.isRequired
};
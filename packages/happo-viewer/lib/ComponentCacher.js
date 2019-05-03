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

var ComponentCacher = function (_React$Component) {
  _inherits(ComponentCacher, _React$Component);

  function ComponentCacher(props) {
    _classCallCheck(this, ComponentCacher);

    var _this = _possibleConstructorReturn(this, (ComponentCacher.__proto__ || Object.getPrototypeOf(ComponentCacher)).call(this, props));

    _this.state = {
      keepMounted: props.visible
    };
    return _this;
  }

  _createClass(ComponentCacher, [{
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        if (nextProps.visible === this.props.visible) {
          return; // no change
        }
        this.setState({
          keepMounted: true
        });
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var visible = this.props.visible;
        var keepMounted = this.state.keepMounted;


        if (!visible && !keepMounted) {
          return null;
        }

        return _react2['default'].createElement(
          'div',
          {
            style: {
              display: visible ? 'block' : 'none'
            }
          },
          this.props.children
        );
      }

      return render;
    }()
  }]);

  return ComponentCacher;
}(_react2['default'].Component);

exports['default'] = ComponentCacher;

ComponentCacher.propTypes = {
  children: _react.PropTypes.node.isRequired,
  visible: _react.PropTypes.bool
};
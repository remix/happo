'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = InlineLink;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function InlineLink(_ref) {
  var children = _ref.children,
      to = _ref.to;

  return _react2['default'].createElement(
    'a',
    { className: 'InlineLink', href: '#' + String(to) },
    children
  );
}
InlineLink.propTypes = {
  children: _react.PropTypes.node.isRequired,
  to: _react.PropTypes.string.isRequired
};
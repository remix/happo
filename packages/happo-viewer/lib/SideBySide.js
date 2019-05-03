'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = SideBySide;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function SideBySide(_ref) {
  var previous = _ref.previous,
      current = _ref.current;

  return _react2['default'].createElement(
    'div',
    { className: 'SideBySide' },
    _react2['default'].createElement('img', {
      className: 'SideBySide__image',
      role: 'presentation',
      src: previous,
      title: 'Before'
    }),
    ' ',
    _react2['default'].createElement('img', {
      className: 'SideBySide__image',
      role: 'presentation',
      src: current,
      title: 'After'
    })
  );
}
SideBySide.propTypes = {
  previous: _react.PropTypes.string.isRequired,
  current: _react.PropTypes.string.isRequired
};
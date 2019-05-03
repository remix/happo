'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = ImageHeading;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InlineLink = require('./InlineLink');

var _InlineLink2 = _interopRequireDefault(_InlineLink);

var _imageShape = require('./imageShape');

var _imageShape2 = _interopRequireDefault(_imageShape);

var _imageSlug = require('./imageSlug');

var _imageSlug2 = _interopRequireDefault(_imageSlug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function ImageHeading(_ref) {
  var image = _ref.image;

  return _react2['default'].createElement(
    'h3',
    { id: (0, _imageSlug2['default'])(image) },
    _react2['default'].createElement(
      _InlineLink2['default'],
      { to: (0, _imageSlug2['default'])(image) },
      image.description,
      ' @ ',
      image.viewportName
    )
  );
}
ImageHeading.propTypes = {
  image: _react.PropTypes.shape(_imageShape2['default']).isRequired
};
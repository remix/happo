'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = NewImage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ImageHeading = require('./ImageHeading');

var _ImageHeading2 = _interopRequireDefault(_ImageHeading);

var _imageShape = require('./imageShape');

var _imageShape2 = _interopRequireDefault(_imageShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function NewImage(_ref) {
  var image = _ref.image;

  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(_ImageHeading2['default'], {
      image: image
    }),
    _react2['default'].createElement(
      'div',
      {
        className: 'NewImage__image',
        style: {
          minHeight: image.height
        }
      },
      _react2['default'].createElement('img', {
        role: 'presentation',
        src: image.current
      })
    )
  );
}
NewImage.propTypes = {
  image: _react.PropTypes.shape(_imageShape2['default']).isRequired
};
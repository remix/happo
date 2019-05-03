'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = DiffImages;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Diff = require('./Diff');

var _InlineLink = require('./InlineLink');

var _InlineLink2 = _interopRequireDefault(_InlineLink);

var _imageShape = require('./imageShape');

var _imageShape2 = _interopRequireDefault(_imageShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function DiffImages(_ref) {
  var images = _ref.images;

  if (!images.length) {
    return null;
  }

  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(
      'h2',
      { id: 'diffs' },
      _react2['default'].createElement(
        _InlineLink2['default'],
        { to: 'diffs' },
        'Diffs (',
        images.length,
        ')'
      )
    ),
    images.map(function (image) {
      return _react2['default'].createElement(_Diff.DiffController, {
        key: image.current,
        image: image
      });
    })
  );
}
DiffImages.propTypes = {
  images: _react.PropTypes.arrayOf(_react.PropTypes.shape(_imageShape2['default'])).isRequired
};
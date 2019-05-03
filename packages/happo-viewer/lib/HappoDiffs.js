'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = HappoDiffs;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DiffImages = require('./DiffImages');

var _DiffImages2 = _interopRequireDefault(_DiffImages);

var _NewImages = require('./NewImages');

var _NewImages2 = _interopRequireDefault(_NewImages);

var _imageShape = require('./imageShape');

var _imageShape2 = _interopRequireDefault(_imageShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function HappoDiffs(_ref) {
  var pageTitle = _ref.pageTitle,
      generatedAt = _ref.generatedAt,
      diffImages = _ref.diffImages,
      newImages = _ref.newImages,
      triggeredByUrl = _ref.triggeredByUrl;

  var date = new Date(generatedAt);
  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(
      'header',
      { className: 'HappoDiffs__header' },
      _react2['default'].createElement(
        'h1',
        { className: 'HappoDiffs__headerTitle' },
        pageTitle
      ),
      _react2['default'].createElement(
        'div',
        null,
        'Generated:',
        ' ',
        date.toLocaleDateString(),
        ' ',
        date.toLocaleTimeString()
      ),
      triggeredByUrl && _react2['default'].createElement(
        'div',
        null,
        'Triggered by:',
        ' ',
        _react2['default'].createElement(
          'a',
          { href: triggeredByUrl },
          triggeredByUrl
        )
      )
    ),
    _react2['default'].createElement(
      'main',
      { className: 'HappoDiffs__main' },
      _react2['default'].createElement(_DiffImages2['default'], {
        images: diffImages
      }),
      _react2['default'].createElement(_NewImages2['default'], {
        images: newImages
      })
    )
  );
}
HappoDiffs.propTypes = {
  pageTitle: _react.PropTypes.string.isRequired,
  diffImages: _react.PropTypes.arrayOf(_imageShape2['default']).isRequired,
  newImages: _react.PropTypes.arrayOf(_imageShape2['default']).isRequired,
  generatedAt: _react.PropTypes.string.isRequired,
  triggeredByUrl: _react.PropTypes.string
};
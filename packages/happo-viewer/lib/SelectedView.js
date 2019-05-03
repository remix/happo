'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = SelectedView;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComponentCacher = require('./ComponentCacher');

var _ComponentCacher2 = _interopRequireDefault(_ComponentCacher);

var _LCSDiff = require('./LCSDiff');

var _LCSDiff2 = _interopRequireDefault(_LCSDiff);

var _SideBySide = require('./SideBySide');

var _SideBySide2 = _interopRequireDefault(_SideBySide);

var _Swiper = require('./Swiper');

var _Swiper2 = _interopRequireDefault(_Swiper);

var _VIEWS = require('./VIEWS');

var _VIEWS2 = _interopRequireDefault(_VIEWS);

var _imageShape = require('./imageShape');

var _imageShape2 = _interopRequireDefault(_imageShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function SelectedView(_ref) {
  var image = _ref.image,
      selectedView = _ref.selectedView;

  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(
      _ComponentCacher2['default'],
      { visible: selectedView === _VIEWS2['default'].SIDE_BY_SIDE },
      _react2['default'].createElement(_SideBySide2['default'], {
        previous: image.previous,
        current: image.current
      })
    ),
    _react2['default'].createElement(
      _ComponentCacher2['default'],
      { visible: selectedView === _VIEWS2['default'].DIFF },
      _react2['default'].createElement(_LCSDiff2['default'], {
        previous: image.previous,
        current: image.current
      })
    ),
    _react2['default'].createElement(
      _ComponentCacher2['default'],
      { visible: selectedView === _VIEWS2['default'].SWIPE },
      _react2['default'].createElement(_Swiper2['default'], {
        previous: image.previous,
        current: image.current
      })
    )
  );
}
SelectedView.propTypes = {
  image: _react.PropTypes.shape(_imageShape2['default']).isRequired,
  selectedView: _react.PropTypes.oneOf(Object.keys(_VIEWS2['default']).map(function (key) {
    return _VIEWS2['default'][key];
  })).isRequired
};
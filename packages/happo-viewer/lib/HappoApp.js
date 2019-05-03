'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _HappoDiffs = require('./HappoDiffs');

var _HappoDiffs2 = _interopRequireDefault(_HappoDiffs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var rootElement = document.getElementById('react-root');
  // We are on the review page
  _reactDom2['default'].render(_react2['default'].createElement(_HappoDiffs2['default'], window.APP_PROPS), rootElement);
});
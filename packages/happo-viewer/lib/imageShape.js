'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

exports['default'] = {
  description: _react.PropTypes.string.isRequired,
  viewportName: _react.PropTypes.string.isRequired,
  previous: _react.PropTypes.string,
  current: _react.PropTypes.string.isRequired,
  height: _react.PropTypes.number.isRequired
};
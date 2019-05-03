'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = imageSlug;

var _cssesc = require('cssesc');

var _cssesc2 = _interopRequireDefault(_cssesc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function imageSlug(_ref) {
  var description = _ref.description,
      viewportName = _ref.viewportName;

  return (0, _cssesc2['default'])(String(description) + '@' + String(viewportName));
}
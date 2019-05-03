'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = exports.DiffController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ImageHeading = require('./ImageHeading');

var _ImageHeading2 = _interopRequireDefault(_ImageHeading);

var _SelectedView = require('./SelectedView');

var _SelectedView2 = _interopRequireDefault(_SelectedView);

var _VIEWS = require('./VIEWS');

var _VIEWS2 = _interopRequireDefault(_VIEWS);

var _imageShape = require('./imageShape');

var _imageShape2 = _interopRequireDefault(_imageShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DiffController = exports.DiffController = function (_React$Component) {
  _inherits(DiffController, _React$Component);

  function DiffController(props) {
    _classCallCheck(this, DiffController);

    var _this = _possibleConstructorReturn(this, (DiffController.__proto__ || Object.getPrototypeOf(DiffController)).call(this, props));

    _this.state = {
      selectedView: _VIEWS2['default'].DIFF
    };

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(DiffController, [{
    key: 'handleClick',
    value: function () {
      function handleClick(view) {
        this.setState({ selectedView: view });
      }

      return handleClick;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        return _react2['default'].createElement(Diff, {
          image: this.props.image,
          selectedView: this.state.selectedView,
          onClick: this.handleClick
        });
      }

      return render;
    }()
  }]);

  return DiffController;
}(_react2['default'].Component);

DiffController.propTypes = {
  image: _react.PropTypes.shape(_imageShape2['default']).isRequired
};

function Diff(_ref) {
  var image = _ref.image,
      selectedView = _ref.selectedView,
      _onClick = _ref.onClick;

  // Compute minHeight based on the height of the largest image, plus 10% to
  // leave room for some additional height needed by the diff view.
  var minHeight = image.height + image.height / 10;

  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(_ImageHeading2['default'], {
      image: image
    }),
    _react2['default'].createElement(
      'div',
      { className: 'Diff__buttons' },
      Object.keys(_VIEWS2['default']).map(function (key) {
        return _VIEWS2['default'][key];
      }).map(function (view, i) {
        var classes = ['Diff__button'];
        if (i === 0) {
          classes.push('Diff__button--first');
        } else if (i === Object.keys(_VIEWS2['default']).length - 1) {
          classes.push('Diff__button--last');
        }

        return _react2['default'].createElement(
          'button',
          {
            key: view,
            className: classes.join(' '),
            'aria-pressed': view === selectedView,
            onClick: function () {
              function onClick() {
                _onClick(view);
              }

              return onClick;
            }()
          },
          view
        );
      })
    ),
    _react2['default'].createElement(
      'div',
      {
        className: 'Diff__images',
        style: {
          minHeight: minHeight
        }
      },
      _react2['default'].createElement(_SelectedView2['default'], { image: image, selectedView: selectedView })
    )
  );
}
exports['default'] = Diff;
Diff.propTypes = {
  image: _react.PropTypes.shape(_imageShape2['default']).isRequired,
  onClick: _react.PropTypes.func.isRequired,
  selectedView: _react.PropTypes.oneOf(Object.keys(_VIEWS2['default']).map(function (key) {
    return _VIEWS2['default'][key];
  })).isRequired
};
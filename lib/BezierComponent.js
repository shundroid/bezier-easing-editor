"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function interp(a, b, x) {
  return a * (1 - x) + b * x;
}

var BezierComponent = function (_React$Component) {
  _inherits(BezierComponent, _React$Component);

  function BezierComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BezierComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BezierComponent.__proto__ || Object.getPrototypeOf(BezierComponent)).call.apply(_ref, [this].concat(args))), _this), _this.x = function (value) {
      return Math.round(interp(_this.props.xFrom, _this.props.xTo, value));
    }, _this.y = function (value) {
      return Math.round(interp(_this.props.yFrom, _this.props.yTo, value));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BezierComponent, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _props = this.props,
          xFrom = _props.xFrom,
          yFrom = _props.yFrom,
          xTo = _props.xTo,
          yTo = _props.yTo;

      return nextProps.xFrom !== xFrom || nextProps.yFrom !== yFrom || nextProps.xTo !== xTo || nextProps.yTo !== yTo;
    }
  }]);

  return BezierComponent;
}(_react2.default.Component);

exports.default = BezierComponent;
//# sourceMappingURL=BezierComponent.js.map
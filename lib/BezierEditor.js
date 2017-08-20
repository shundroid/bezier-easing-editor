"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Grid = require("./Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Handle = require("./Handle");

var _Handle2 = _interopRequireDefault(_Handle);

var _Progress = require("./Progress");

var _Progress2 = _interopRequireDefault(_Progress);

var _Curve = require("./Curve");

var _Curve2 = _interopRequireDefault(_Curve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function onEnterHandle(h) {
  if (!this.state.down) {
    this.setState({
      hover: h
    });
  }
}
function onDownHandle(h, e) {
  e.preventDefault();
  this.setState({
    hover: null,
    down: h
  });
  window.addEventListener('mousemove', this.onDownMove);
  window.addEventListener('mouseup', this.onDownUp);
  window.addEventListener('touchmove', this.onDownMove);
  window.addEventListener('touchend', this.onDownUp);
}

function onLeaveHandle() {
  if (!this.state.down) {
    this.setState({
      hover: null
    });
  }
}

var BezierEditor = function (_Component) {
  _inherits(BezierEditor, _Component);

  function BezierEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BezierEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BezierEditor.__proto__ || Object.getPrototypeOf(BezierEditor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      down: 0,
      hover: 0
    }, _this.onEnterHandle1 = onEnterHandle.bind(_this, 1), _this.onEnterHandle2 = onEnterHandle.bind(_this, 2), _this.onLeaveHandle1 = onLeaveHandle.bind(_this, 1), _this.onLeaveHandle2 = onLeaveHandle.bind(_this, 2), _this.onDownHandle1 = onDownHandle.bind(_this, 1), _this.onDownHandle2 = onDownHandle.bind(_this, 2), _this.onDownMove = function (e) {
      if (_this.state.down) {
        e.preventDefault();
        var i = 2 * (_this.state.down - 1);
        var value = [].concat(_this.props.value);

        var _this$positionForEven = _this.positionForEvent(e),
            _this$positionForEven2 = _slicedToArray(_this$positionForEven, 2),
            x = _this$positionForEven2[0],
            y = _this$positionForEven2[1];

        value[i] = _this.inversex(x);
        value[i + 1] = _this.inversey(y);
        _this.props.onChange(value);
      }
    }, _this.onDownUp = function () {
      window.removeEventListener('mousemove', _this.onDownMove);
      window.removeEventListener('mouseup', _this.onDownUp);
      window.removeEventListener('touchmove', _this.onDownMove);
      window.removeEventListener('touchend', _this.onDownUp);
      _this.setState({
        down: 0
      });
      _this.props.onFinish(_this.props.value);
    }, _this.positionForEvent = function (e) {
      var rect = _this.refs.root.getBoundingClientRect();
      var x = e.touches ? e.touches[0].clientX : e.clientX;
      var y = e.touches ? e.touches[0].clientY : e.clientY;
      return [x - rect.left, y - rect.top];
    }, _this.x = function (value) {
      var padding = _this.props.padding;
      var w = _this.props.width - padding[1] - padding[3];
      return Math.round(padding[3] + value * w);
    }, _this.inversex = function (x) {
      var padding = _this.props.padding;
      var w = _this.props.width - padding[1] - padding[3];
      return Math.max(0, Math.min((x - padding[3]) / w, 1));
    }, _this.y = function (value) {
      var padding = _this.props.padding;
      var h = _this.props.height - padding[0] - padding[2];
      return Math.round(padding[0] + (1 - value) * h);
    }, _this.inversey = function (y) {
      var _this$props = _this.props,
          height = _this$props.height,
          handleRadius = _this$props.handleRadius,
          padding = _this$props.padding;

      var clampMargin = 2 * handleRadius;
      var h = height - padding[0] - padding[2];
      y = Math.max(clampMargin, Math.min(y, height - clampMargin));
      return 1 - (y - padding[0]) / h;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BezierEditor, [{
    key: "render",
    value: function render() {
      var x = this.x,
          y = this.y;
      var _props = this.props,
          value = _props.value,
          width = _props.width,
          height = _props.height,
          handleRadius = _props.handleRadius,
          style = _props.style,
          className = _props.className,
          progress = _props.progress,
          handleStroke = _props.handleStroke,
          background = _props.background,
          gridColor = _props.gridColor,
          curveColor = _props.curveColor,
          curveWidth = _props.curveWidth,
          handleColor = _props.handleColor,
          textStyle = _props.textStyle,
          progressColor = _props.progressColor,
          readOnly = _props.readOnly,
          pointers = _props.pointers;
      var _state = this.state,
          down = _state.down,
          hover = _state.hover;


      var sharedProps = {
        xFrom: x(0),
        yFrom: y(0),
        xTo: x(1),
        yTo: y(1)
      };

      var cursor = _extends({}, BezierEditor.propTypes.pointers, pointers);

      var styles = _extends({
        background: background,
        cursor: down ? cursor.down : hover ? cursor.hover : cursor.def,
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none"
      }, style);

      var containerEvents = readOnly || !down ? {} : {};
      var handle1Events = readOnly || down ? {} : {
        onMouseDown: this.onDownHandle1,
        onTouchStart: this.onDownHandle1,
        onMouseEnter: this.onEnterHandle1,
        onMouseLeave: this.onLeaveHandle1
      };
      var handle2Events = readOnly || down ? {} : {
        onMouseDown: this.onDownHandle2,
        onTouchStart: this.onDownHandle2,
        onMouseEnter: this.onEnterHandle2,
        onMouseLeave: this.onLeaveHandle2
      };

      return _react2.default.createElement(
        "svg",
        _extends({
          ref: "root",
          className: className,
          style: styles,
          width: width,
          height: height
        }, containerEvents),
        _react2.default.createElement(_Grid2.default, _extends({}, sharedProps, {
          background: background,
          gridColor: gridColor,
          textStyle: _extends({}, BezierEditor.defaultProps.textStyle, textStyle)
        })),
        _react2.default.createElement(_Progress2.default, _extends({}, sharedProps, {
          value: value,
          progress: progress,
          progressColor: progressColor
        })),
        _react2.default.createElement(_Curve2.default, _extends({}, sharedProps, {
          value: value,
          curveColor: curveColor,
          curveWidth: curveWidth
        })),
        this.props.children,
        readOnly ? undefined : _react2.default.createElement(
          "g",
          null,
          _react2.default.createElement(_Handle2.default, _extends({}, sharedProps, handle1Events, {
            index: 0,
            xval: value[0],
            yval: value[1],
            handleRadius: handleRadius,
            handleColor: handleColor,
            down: down === 1,
            hover: hover === 1,
            handleStroke: handleStroke,
            background: background
          })),
          _react2.default.createElement(_Handle2.default, _extends({}, sharedProps, handle2Events, {
            index: 1,
            xval: value[2],
            yval: value[3],
            handleRadius: handleRadius,
            handleColor: handleColor,
            down: down === 2,
            hover: hover === 2,
            handleStroke: handleStroke,
            background: background
          }))
        )
      );
    }
  }]);

  return BezierEditor;
}(_react.Component);

BezierEditor.propTypes = {
  value: _propTypes2.default.array,
  onChange: _propTypes2.default.func,
  onFinish: _propTypes2.default.func,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  padding: _propTypes2.default.array,
  handleRadius: _propTypes2.default.number,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  progress: _propTypes2.default.number,
  handleStroke: _propTypes2.default.number,
  background: _propTypes2.default.string,
  gridColor: _propTypes2.default.string,
  curveColor: _propTypes2.default.string,
  curveWidth: _propTypes2.default.number,
  handleColor: _propTypes2.default.string,
  color: _propTypes2.default.string,
  textStyle: _propTypes2.default.object,
  progressColor: _propTypes2.default.string,
  readOnly: _propTypes2.default.bool
};
BezierEditor.defaultProps = {
  value: [0.25, 0.25, 0.75, 0.75],
  onFinish: function onFinish() {},
  width: 300,
  height: 300,
  padding: [25, 5, 25, 18],
  progress: 0,
  background: "#fff",
  color: "#000", // FIXME what is color?
  gridColor: "#eee",
  curveColor: "#333",
  progressColor: "#ccc",
  handleColor: "#f00",
  curveWidth: 2,
  handleRadius: 5,
  handleStroke: 2,
  textStyle: {
    fontFamily: "sans-serif",
    fontSize: "10px"
  },
  pointers: {
    down: "none",
    hover: "pointer",
    def: "default"
  }
};
exports.default = BezierEditor;
//# sourceMappingURL=BezierEditor.js.map
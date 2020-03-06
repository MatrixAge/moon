"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "promisify", {
  enumerable: true,
  get: function get() {
    return _promisify.promisify;
  }
});
Object.defineProperty(exports, "promisifyAll", {
  enumerable: true,
  get: function get() {
    return _promisify.promisifyAll;
  }
});
exports["default"] = void 0;

var _moon = _interopRequireDefault(require("./moon"));

var _promisify = require("./promisify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _moon["default"];
exports["default"] = _default;
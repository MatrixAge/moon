"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisifyAll = promisifyAll;
exports.promisify = void 0;

var _method = require("./method");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function hasCallback(args) {
  if (!args || _typeof(args) !== 'object') return false;
  var callback = ['success', 'fail', 'complete'];

  for (var _i = 0, _callback = callback; _i < _callback.length; _i++) {
    var m = _callback[_i];
    if (typeof args[m] === 'function') return true;
  }

  return false;
}

function _promisify(func) {
  if (typeof func !== 'function') return func;
  return function () {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new Promise(function (resolve, reject) {
      func(Object.assign(args, {
        success: resolve,
        fail: reject
      }));
    });
  };
}

function promisifyAll() {
  var wx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var wxp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Object.keys(wx).forEach(function (key) {
    var fn = wx[key];

    if (typeof fn === 'function' && _method.asyncMethods.indexOf(key) >= 0) {
      wxp[key] = function (args) {
        if (hasCallback(args)) {
          fn(args);
        } else {
          return _promisify(fn)(args);
        }
      };
    } else {
      wxp[key] = fn;
    }
  });
}

var promisify = _promisify;
exports.promisify = promisify;
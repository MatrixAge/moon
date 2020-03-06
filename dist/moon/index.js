"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var moon = function moon(wx) {
  var _wx = wx;
  var _data = {};
  var _data_proxy = {};
  var _callback = {};

  var define = function define(obj) {
    _data = obj;
  };

  _wx.$set = function (obj) {
    Object.keys(obj).map(function (key) {
      _data_proxy[key] = obj[key];
    });
  };

  _wx.$watch = function (key, cb) {
    _callback = Object.assign({}, _callback, _defineProperty({}, key, _callback[key] || []));

    _callback[key].push(cb);

    _data_proxy = new Proxy(_data, {
      get: function get(target, name, receiver) {
        return Reflect.get(target, name, receiver);
      },
      set: function set(target, name, value, receiver) {
        if (Array.isArray(_callback[name])) {
          _callback[name].map(function (func) {
            return func(value, _data[name]);
          });
        }

        return Reflect.set(target, name, value, receiver);
      }
    });
  };

  _wx.$getData = function () {
    return _data;
  };

  return {
    define: define
  };
};

var _default = moon;
exports["default"] = _default;
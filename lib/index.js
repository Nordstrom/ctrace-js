'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _opentracing = require('opentracing');

var opentracing = _interopRequireWildcard(_opentracing);

var _globalTracer = require('./globalTracer');

var _globalTracer2 = _interopRequireDefault(_globalTracer);

var _express = require('./middleware/express');

var _express2 = _interopRequireDefault(_express);

var _request = require('./middleware/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const tracer = Object.assign(new _globalTracer2.default(), opentracing);
tracer.express = _express2.default;
tracer.request = _request2.default;

exports.default = tracer;
module.exports = exports['default'];
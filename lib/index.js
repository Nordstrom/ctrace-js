'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_39gnqh32p = function () {
  var path = '/Users/a50r/dev/src/ctrace-js/src/index.js',
      hash = '8e725b4acc1700f3ec94485ddfc5d4ca3cabd005',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/a50r/dev/src/ctrace-js/src/index.js',
    statementMap: {
      '0': {
        start: {
          line: 6,
          column: 15
        },
        end: {
          line: 6,
          column: 61
        }
      },
      '1': {
        start: {
          line: 7,
          column: 0
        },
        end: {
          line: 7,
          column: 24
        }
      },
      '2': {
        start: {
          line: 8,
          column: 0
        },
        end: {
          line: 8,
          column: 24
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      '0': 0,
      '1': 0,
      '2': 0
    },
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

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

const tracer = (++cov_39gnqh32p.s[0], Object.assign(new _globalTracer2.default(), opentracing));
++cov_39gnqh32p.s[1];
tracer.express = _express2.default;
++cov_39gnqh32p.s[2];
tracer.request = _request2.default;

exports.default = tracer;
module.exports = exports['default'];
'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var cov_7zm44wgx1 = (function () {
  var path = '/Users/asaj/source/cma/ctrace-js/src/index.js',
    hash = 'dbb862aae7803cde7021c9b299299afeef56680f',
    global = new Function('return this')(),
    gcv = '__coverage__',
    coverageData = {
      path: '/Users/asaj/source/cma/ctrace-js/src/index.js',
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
        },
        '3': {
          start: {
            line: 9,
            column: 18
          },
          end: {
            line: 9,
            column: 52
          }
        },
        '4': {
          start: {
            line: 12,
            column: 2
          },
          end: {
            line: 19,
            column: 3
          }
        },
        '5': {
          start: {
            line: 13,
            column: 4
          },
          end: {
            line: 17,
            column: 5
          }
        },
        '6': {
          start: {
            line: 14,
            column: 6
          },
          end: {
            line: 14,
            column: 49
          }
        },
        '7': {
          start: {
            line: 15,
            column: 11
          },
          end: {
            line: 17,
            column: 5
          }
        },
        '8': {
          start: {
            line: 16,
            column: 6
          },
          end: {
            line: 16,
            column: 49
          }
        },
        '9': {
          start: {
            line: 18,
            column: 4
          },
          end: {
            line: 18,
            column: 67
          }
        },
        '10': {
          start: {
            line: 22,
            column: 0
          },
          end: {
            line: 24,
            column: 1
          }
        },
        '11': {
          start: {
            line: 23,
            column: 2
          },
          end: {
            line: 23,
            column: 44
          }
        }
      },
      fnMap: {
        '0': {
          name: 'logFn',
          decl: {
            start: {
              line: 11,
              column: 9
            },
            end: {
              line: 11,
              column: 14
            }
          },
          loc: {
            start: {
              line: 11,
              column: 23
            },
            end: {
              line: 20,
              column: 1
            }
          },
          line: 11
        },
        '1': {
          name: 'log',
          decl: {
            start: {
              line: 12,
              column: 18
            },
            end: {
              line: 12,
              column: 21
            }
          },
          loc: {
            start: {
              line: 12,
              column: 41
            },
            end: {
              line: 19,
              column: 3
            }
          },
          line: 12
        }
      },
      branchMap: {
        '0': {
          loc: {
            start: {
              line: 13,
              column: 4
            },
            end: {
              line: 17,
              column: 5
            }
          },
          type: 'if',
          locations: [{
            start: {
              line: 13,
              column: 4
            },
            end: {
              line: 17,
              column: 5
            }
          }, {
            start: {
              line: 13,
              column: 4
            },
            end: {
              line: 17,
              column: 5
            }
          }],
          line: 13
        },
        '1': {
          loc: {
            start: {
              line: 15,
              column: 11
            },
            end: {
              line: 17,
              column: 5
            }
          },
          type: 'if',
          locations: [{
            start: {
              line: 15,
              column: 11
            },
            end: {
              line: 17,
              column: 5
            }
          }, {
            start: {
              line: 15,
              column: 11
            },
            end: {
              line: 17,
              column: 5
            }
          }],
          line: 15
        }
      },
      s: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0
      },
      f: {
        '0': 0,
        '1': 0
      },
      b: {
        '0': [0, 0],
        '1': [0, 0]
      },
      _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
    },
    coverage = global[gcv] || (global[gcv] = {})

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path]
  }

  coverageData.hash = hash
  return coverage[path] = coverageData
}())

var _opentracing = require('opentracing')

var opentracing = _interopRequireWildcard(_opentracing)

var _globalTracer = require('./globalTracer')

var _globalTracer2 = _interopRequireDefault(_globalTracer)

var _express = require('./middleware/express')

var _express2 = _interopRequireDefault(_express)

var _request = require('./middleware/request')

var _request2 = _interopRequireDefault(_request)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _interopRequireWildcard (obj) { if (obj && obj.__esModule) { return obj } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key] } } newObj.default = obj; return newObj } }

const tracer = (++cov_7zm44wgx1.s[0], Object.assign(new _globalTracer2.default(), opentracing))
++cov_7zm44wgx1.s[1]
tracer.express = _express2.default
++cov_7zm44wgx1.s[2]
tracer.request = _request2.default
const logLevels = (++cov_7zm44wgx1.s[3], ['debug', 'info', 'warn', 'error'])

function logFn (level) {
  ++cov_7zm44wgx1.f[0]
  ++cov_7zm44wgx1.s[4]

  return function log (ctx, event, data) {
    ++cov_7zm44wgx1.f[1]
    ++cov_7zm44wgx1.s[5]

    if (level === 'debug') {
      ++cov_7zm44wgx1.b[0][0]
      ++cov_7zm44wgx1.s[6]

      data = Object.assign({ debug: true }, data)
    } else {
      ++cov_7zm44wgx1.b[0][1]
      ++cov_7zm44wgx1.s[7]
      if (level === 'error') {
        ++cov_7zm44wgx1.b[1][0]
        ++cov_7zm44wgx1.s[8]

        data = Object.assign({ error: true }, data)
      } else {
        ++cov_7zm44wgx1.b[1][1]
      }
    }++cov_7zm44wgx1.s[9]
    ctx.span.log(Object.assign({ event: event, level: level }, data))
  }
}

++cov_7zm44wgx1.s[10]
for (let i = 0; i < logLevels.length; i++) {
  ++cov_7zm44wgx1.s[11]

  tracer[logLevels[i]] = logFn(logLevels[i])
}

exports.default = tracer
module.exports = exports['default']

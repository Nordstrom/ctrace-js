"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_lydsfr3lw = function () {
  var path = "/Users/a50r/dev/src/github.com/Nordstrom/ctrace-js/src/propagators/propagator.js",
      hash = "95c5c33c516739638a26a50061ea1454d305712c",
      global = new Function('return this')(),
      gcv = "__coverage__",
      coverageData = {
    path: "/Users/a50r/dev/src/github.com/Nordstrom/ctrace-js/src/propagators/propagator.js",
    statementMap: {},
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 11,
            column: 2
          },
          end: {
            line: 11,
            column: 3
          }
        },
        loc: {
          start: {
            line: 11,
            column: 20
          },
          end: {
            line: 11,
            column: 22
          }
        },
        line: 11
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 18,
            column: 2
          },
          end: {
            line: 18,
            column: 3
          }
        },
        loc: {
          start: {
            line: 18,
            column: 32
          },
          end: {
            line: 18,
            column: 34
          }
        },
        line: 18
      }
    },
    branchMap: {},
    s: {},
    f: {
      "0": 0,
      "1": 0
    },
    b: {},
    _coverageSchema: "332fd63041d2c1bcb487cc26dd0d5f7d97098a6c"
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

/**
 * Interface for custom context propagation.  If extract or inject methods are present they
 * will be used in the propagation chain.
 */
class Propagator {
  /**
   * Extract span context from a given carrier.
   * @param {object} carrier
   * @return {SpanContext}
   */
  extract(carrier) {
    ++cov_lydsfr3lw.f[0];
  }

  /**
   * Inject span context into a given carrier.
   * @param {SpanContext} spanContext
   * @param {object} carrier
   */
  inject(spanContext, carrier) {
    ++cov_lydsfr3lw.f[1];
  }
}
exports.default = Propagator;
module.exports = exports["default"];
/**
 * An object containing the context used to propagate from span to span
 *
 * @typedef {object} SpanContext
 * @property {string} traceId - id of trace including multiple spans
 * @property {string} spanId - id of span (start/stop event)
 * @property {Object.<string, string>} baggage - optional key/value map of tags that carry across spans in a single trace.
 */

/** @typedef {Propagator[]} Propagators **/
"use strict";

var cov_15lqgadldq = function () {
  var path = "/Users/a50r/dev/src/github.com/Nordstrom/ctrace-js/src/definitions.js",
      hash = "72dcbdaae0b868b6f4972165745baf73195b3973",
      global = new Function('return this')(),
      gcv = "__coverage__",
      coverageData = {
    path: "/Users/a50r/dev/src/github.com/Nordstrom/ctrace-js/src/definitions.js",
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
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
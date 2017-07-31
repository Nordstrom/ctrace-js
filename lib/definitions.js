/**
 * An object containing the context used to propagate from span to span
 *
 * @typedef {object} SpanContext
 * @property {string} traceId - id of trace including multiple spans
 * @property {string} spanId - id of span (start/stop event)
 * @property {Object.<string, string>} baggage - optional key/value map of tags that carry across spans in a single trace.
 */

/** @typedef {Propagator[]} Propagators **/
'use strict'

var cov_1j49rx4ru1 = (function () {
  var path = '/Users/asaj/source/cma/ctrace-js/src/definitions.js',
    hash = '367b4e9993b03ba67d11624997503430bb112ed2',
    global = new Function('return this')(),
    gcv = '__coverage__',
    coverageData = {
      path: '/Users/asaj/source/cma/ctrace-js/src/definitions.js',
      statementMap: {},
      fnMap: {},
      branchMap: {},
      s: {},
      f: {},
      b: {},
      _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
    },
    coverage = global[gcv] || (global[gcv] = {})

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path]
  }

  coverageData.hash = hash
  return coverage[path] = coverageData
}())

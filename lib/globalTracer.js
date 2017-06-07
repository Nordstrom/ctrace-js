'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tracer = require('./tracer');

var _tracer2 = _interopRequireDefault(_tracer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GlobalTracer {
  constructor() {
    this._tracer = new _tracer2.default();
  }

  startSpan(name, fields) {
    return this._tracer.startSpan(name, fields);
  }

  inject(spanContext, format, carrier) {
    this._tracer.inject(spanContext, format, carrier);
  }

  extract(format, carrier) {
    return this._tracer.extract(format, carrier);
  }

  init(opts) {
    this._tracer = new _tracer2.default(opts);
  }
}
exports.default = GlobalTracer;
module.exports = exports['default'];
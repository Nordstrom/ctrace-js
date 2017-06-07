'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = expressMiddleware;

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {Object} [opts]
 * @param {Function} [opts.operationNameBuilder]
 * @returns {Function}
 */
// todo: allow tracer to be passed in as option
function expressMiddleware(opts) {
  opts = opts || {};

  return function handle(req, res, next) {
    const context = _2.default.extract(_2.default.FORMAT_HTTP_HEADERS, req.headers);
    let opName = opts.operationNameBuilder && opts.operationNameBuilder(req) || `${req.method}:${req.originalUrl}`;
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    const span = _2.default.startSpan(opName, {
      childOf: context,
      tags: {
        'span.kind': 'server',
        'component': 'ctrace-express',
        'http.remote_addr': req.ip,
        'http.method': req.method,
        'http.url': fullUrl
      }
    });
    req.traceContext = { span: span };

    res.on('finish', function () {
      if (res.statusCode >= 400) {
        span.addTags({
          'http.status_code': res.statusCode,
          'error': true
        });
      } else {
        span.addTags({ 'http.status_code': res.statusCode });
      }
      span.finish();
    });

    next();
  };
}
module.exports = exports['default'];
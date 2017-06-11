import tracer from '../'

export default function express (opts) {
  opts = opts || {}

  return function handle (req, res, next) {
    const context = tracer.extract(tracer.FORMAT_HTTP_HEADERS, req.headers)
    let opName = (opts.operationNameBuilder && opts.operationNameBuilder(req)) || `${req.method}:${req.originalUrl}`
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl

    const span = tracer.startSpan(opName, {
      childOf: context,
      tags: {
        'span.kind': 'server',
        'component': 'ctrace-express',
        'http.remote_addr': req.ip,
        'http.method': req.method,
        'http.url': fullUrl
      }
    })
    req.ctrace = { span: span }

    res.on('finish', function () {
      if (res.statusCode >= 400) {
        span.addTags({
          'http.status_code': res.statusCode,
          'error': true
        })
      } else {
        span.addTags({'http.status_code': res.statusCode})
      }
      span.finish()
    })

    next()
  }
}

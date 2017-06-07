import Tracer from './tracer'

export default class GlobalTracer {
  constructor () {
    this._tracer = new Tracer()
  }

  startSpan (name, fields) {
    return this._tracer.startSpan(name, fields)
  }

  inject (spanContext, format, carrier) {
    this._tracer.inject(spanContext, format, carrier)
  }

  extract (format, carrier) {
    return this._tracer.extract(format, carrier)
  }

  init (opts) {
    this._tracer = new Tracer(opts)
  }
}

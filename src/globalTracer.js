import Tracer from './tracer'

/**
 * Global tracer singleton.  This is accessed as follows.
 *
 *     const tracer = require('ctrace')
 */
export default class GlobalTracer {
  constructor () {
    this._tracer = new Tracer()
  }

  /**
   * Singleton wrapper for {@link Tracer#startSpan}
   */
  startSpan (name, context) {
    return this._tracer.startSpan(name, context)
  }

  inject (spanContext, format, carrier) {
    this._tracer.inject(spanContext, format, carrier)
  }

  extract (format, carrier) {
    return this._tracer.extract(format, carrier)
  }

  /**
   * Used to initialize global tracer singleton
   *
   * @param {object} options - options used to initialize tracer
   * @param {bool} [options.multiEvent] - true for multi-event mode; otherwise, single-event mode
   * @param {bool} [options.debug] - true for debug; otherwise, it is disabled
   * @param {Object.<string, Propagators>} [options.propagators] - optional propagators
   * @param {string} [options.serviceName] - allows the configuration of the "service" tag for the entire Tracer if not
   *                                         specified here, can also be set using env variable "ctrace_service_name"
   */
  init (options) {
    this._tracer = new Tracer(options)
  }
}

/**
 * An object containing the context used to propagate from span to span
 *
 * @typedef {object} SpanContext
 * @property {string} traceId - id of trace including multiple spans
 * @property {string} spanId - id of span (start/stop event)
 * @property {Object.<string, string>} baggage - optional key/value map of tags that carry across spans in a single trace.
 */

/** @typedef {Propagator[]} Propagators **/

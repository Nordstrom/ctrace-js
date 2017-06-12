export default class TextPropagator {

  constructor (opts) {
    if (!opts) opts = {}
    this.traceIdKey = opts.traceIdKey || 'ct-trace-id'
    this.spanIdKey = opts.spanIdKey || 'ct-span-id'
    this.baggagePrefix = opts.baggagePrefix || 'ct-bag-'
    this.encodeValue = opts.encodeValue || encodeURI
    this.decodeValue = opts.decodeValue || decodeURI
  }

  extract (carrier) {
    let ctx = {
      traceId: carrier[this.traceIdKey],
      spanId: carrier[this.spanIdKey]
    }

    let baggage

    for (let key in carrier) {
      if (!carrier.hasOwnProperty(key)) continue
      if (!key.startsWith(this.baggagePrefix)) continue
      if (!baggage) baggage = {}
      if (!key) continue
      baggage[key.substring(this.baggagePrefix.length)] = this.decodeValue(carrier[key])
    }
    if (baggage) ctx.baggage = baggage
    if (ctx.traceId && ctx.spanId) return ctx
  }

  inject (spanContext, carrier) {
    if (spanContext.traceId) carrier[this.traceIdKey] = spanContext.traceId
    if (spanContext.spanId) carrier[this.spanIdKey] = spanContext.spanId

    const baggage = spanContext.baggage
    if (!baggage) return
    for (let key in baggage) {
      if (!baggage.hasOwnProperty(key)) continue
      carrier[`${this.baggagePrefix}${key}`] = this.encodeValue(baggage[key])
    }
  }
}

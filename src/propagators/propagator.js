/**
 * Interface for custom context propagation.  If extract or inject methods are present they
 * will be used in the propagation chain.
 */
export default class Propagator {
  /**
   * Extract span context from a given carrier.
   * @param {object} carrier
   * @return {SpanContext}
   */
  extract (carrier) {}

  /**
   * Inject span context into a given carrier.
   * @param {SpanContext} spanContext
   * @param {object} carrier
   */
  inject (spanContext, carrier) {}
}

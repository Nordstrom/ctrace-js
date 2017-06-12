const fs = require('fs')
const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()
const pino = require('pino')
const genId = require('./lib/Tracer').genId
const tracer = require('./lib')
const logger = pino(fs.createWriteStream('dump-pino.json'))

tracer.init({stream: fs.createWriteStream('dump.json')})

suite.add('parent-child-log', () => {
  const span = tracer.startSpan('parent', {
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    }
  })

  const child = tracer.startSpan('child', {
    childOf: span,
    tags: {
      'span.kind': 'server',
      'component': 'child-component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    }
  })

  child.log({event: 'child-event'})
  child.finish()
  span.finish()
})

suite.add('parent', () => {
  const span = tracer.startSpan('parent', {
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    }
  })
  span.finish()
})

suite.add('parent-child', () => {
  const span = tracer.startSpan('parent', {
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    }
  })

  const child = tracer.startSpan('child', {
    childOf: span,
    tags: {
      'span.kind': 'server',
      'component': 'child-component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    }
  })

  child.finish()
  span.finish()
})

suite.add('pino-parent-child-log', () => {
  const traceId = genId()
  logger.info({
    traceId: traceId,
    spanId: traceId,
    operation: 'parent',
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    },
    log: {event: 'Start-Span', timestamp: Date.now()}
  })

  logger.info({
    traceId: traceId,
    spanId: traceId,
    operation: 'child',
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    },
    log: {event: 'Start-Span', timestamp: Date.now()}
  })

  logger.info({
    traceId: traceId,
    spanId: traceId,
    operation: 'child',
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    },
    log: {event: 'child-event', timestamp: Date.now()}
  })

  logger.info({
    traceId: traceId,
    spanId: traceId,
    operation: 'child',
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    },
    log: {event: 'Finish-Span', timestamp: Date.now()}
  })

  logger.info({
    traceId: traceId,
    spanId: traceId,
    operation: 'parent',
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    },
    log: {event: 'Finish-Span', timestamp: Date.now()}
  })
})

suite.add('pino-parent', () => {
  const traceId = genId()
  logger.info({
    traceId: traceId,
    spanId: traceId,
    operation: 'parent',
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    },
    log: {event: 'Start-Span', timestamp: Date.now()}
  })

  logger.info({
    traceId: traceId,
    spanId: traceId,
    operation: 'parent',
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    },
    log: {event: 'Finish-Span', timestamp: Date.now()}
  })
})

suite.add('pino-parent-child', () => {
  const traceId = genId()
  logger.info({
    traceId: traceId,
    spanId: traceId,
    operation: 'parent',
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    },
    log: {event: 'Start-Span', timestamp: Date.now()}
  })

  logger.info({
    traceId: traceId,
    spanId: traceId,
    operation: 'child',
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    },
    log: {event: 'Start-Span', timestamp: Date.now()}
  })

  logger.info({
    traceId: traceId,
    spanId: traceId,
    operation: 'child',
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    },
    log: {event: 'Finish-Span', timestamp: Date.now()}
  })

  logger.info({
    traceId: traceId,
    spanId: traceId,
    operation: 'parent',
    tags: {
      'span.kind': 'server',
      'component': 'component',
      'peer.hostname': 'hostname',
      'peer.ipv6': 'ip',
      'http.method': 'method',
      'http.url': 'https://some.url.outthere.com'
    },
    log: {event: 'Finish-Span', timestamp: Date.now()}
  })
})

suite.on('cycle', (e) => {
  console.log(String(e.target), 1000000000 / e.target.hz, 'nanos/op')
})

suite.on('complete', (e) => {
  console.log('done')
})

suite.run({ 'async': true })

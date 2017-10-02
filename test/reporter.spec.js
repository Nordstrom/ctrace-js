'use strict'

require('should')

const os = require('os')
const Reporter = require('../src/reporter.js')
const Encoder = require('../src/encoder.js')
const Stream = require('./util/stream.js')

describe('reporter', () => {
  let stream, buf, reporter

  before(() => {
    stream = new Stream()
    buf = stream.buf
    reporter = new Reporter(new Encoder(), stream)
  })

  it('should report span', () => {
    reporter.report({
      traceId: 'abc',
      spanId: 'def',
      parentId: 'ghi',
      operation: 'op1',
      start: 1489522409134,
      duration: 123,
      tags: {
        tag1: 'val1',
        tag2: 'val2'
      },
      logs: [
        {timestamp: 1489522409134, event: 'Start-Span'},
        {timestamp: 1489522409135, event: 'Finish-Span'}
      ]
    })

    buf[0].should.equal(
      '{"traceId":"abc","spanId":"def","parentId":"ghi","operation":"op1",' +
      '"start":1489522409134,"duration":123,' +
      '"tags":{"tag1":"val1","tag2":"val2"},' +
      '"logs":[{"timestamp":1489522409134,"event":"Start-Span"},' +
      '{"timestamp":1489522409135,"event":"Finish-Span"}]}' + os.EOL
    )
  })

  it('should report to stdout by default', () => {
    // This only tests that defaulting to stdout does not produce an error
    new Reporter({encode: () => { return '' }}).report()
  })
})

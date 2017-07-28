import Encoder from '../src/encoder'
import os from 'os'
import 'should'

describe('encoder', () => {
  it('should encode full span', () => {
    let encoded = new Encoder().encode({
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
      logs: [{
        timestamp: 1489522409135,
        event: 'event1'
      }],
      baggage: {
        bag1: 'val1',
        bag2: 'val2'
      }
    })

    encoded.should.equal(
      '{"traceId":"abc","spanId":"def","parentId":"ghi","operation":"op1",' +
      '"start":1489522409134,"duration":123,"tags":{"tag1":"val1","tag2":"val2"},' +
      '"logs":[{"timestamp":1489522409135,"event":"event1"}],' +
      '"baggage":{"bag1":"val1","bag2":"val2"}}' + os.EOL
    )
  })

  it('should redact values', () => {
    let encoded = new Encoder({omitList: [/redact/]}).encode({
      traceId: 'abc',
      spanId: 'def',
      parentId: 'ghi',
      operation: 'op1',
      start: 1489522409134,
      duration: 123,
      tags: {
        redact: 'val1',
        tag2: 'val2'
      },
      logs: [{
        timestamp: 1489522409135,
        event: 'redact'
      }],
      baggage: {
        bag1: 'val1',
        bag2: 'val2'
      }
    })

    encoded.should.equal(
      '{"traceId":"abc","spanId":"def","parentId":"ghi","operation":"op1",' +
      '"start":1489522409134,"duration":123,"tags":{"redact":"***","tag2":"val2"},' +
      '"logs":[{"timestamp":1489522409135,"event":"redact"}],' +
      '"baggage":{"bag1":"val1","bag2":"val2"}}' + os.EOL
    )
  })

  it('should redact from the operation', function () {
    let encoded = new Encoder({
      omitList: [
        /foo=[\w|\s]+/g,
        /baz=[\w|\s]+/g
      ]
    }).encode({
      operation: 'foo=bar,baz=bloop'
    })

    encoded.should.equal(
      '{"traceId":"undefined","spanId":"undefined","operation":"***,***","start":undefined}' + os.EOL
    )
  })

  it('should redact from the http.url', function () {
    let encoded = new Encoder({
      omitList: [
        'foo',
        'baz'
      ]
    }).encode({
      tags: {'http.url': 'example.com?foo=bar&baz=bloop'}
    })

    encoded.should.equal(
      '{"traceId":"undefined","spanId":"undefined","operation":"undefined","start":undefined,"tags":{"http.url":"example.com?foo=***&baz=***"}}' + os.EOL
    )
  })
})

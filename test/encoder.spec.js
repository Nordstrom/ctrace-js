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
    let encoded = new Encoder({omitList:[/redact/]}).encode({
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
      '"start":1489522409134,"duration":123,"tags":{"tag2":"val2"},' +
      '"logs":[{"timestamp":1489522409135,"event":"REDACTED"}],' +
      '"baggage":{"bag1":"val1","bag2":"val2"}}' + os.EOL
    )
  })

  it('should redact from the operation', function(){
    let encoded = new Encoder({
      urlSwapList:[
        /foo=[\w|\s]+/g,
        /baz=[\w|\s]+/g,
      ]
    }).encode({
      operation: 'foo=bar,baz=bloop'
    })

    encoded.should.equal(
      '{"traceId":"undefined","spanId":"undefined","operation":"REDACTED,REDACTED","start":undefined}' + os.EOL
    )
  })

  it('should redact from the operation', function(){
    let encoded = new Encoder({
      urlSwapList:[
        /foo=[\w|\s]+/g,
        /baz=[\w|\s]+/g,
      ]
    }).encode({
      tags: {'http.url': 'foo=bar,baz=bloop'}
    })

    encoded.should.equal(
      '{"traceId":"undefined","spanId":"undefined","operation":"undefined","start":undefined,"tags":{"http.url":"REDACTED,REDACTED"}}' + os.EOL
    )
  })
})

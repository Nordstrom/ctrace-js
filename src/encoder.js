const os = require('os')
const jsonRedactor = require('json-redactor')
const redactMessage = 'REDACTED'
const stringify = JSON.stringify

export default class Encoder {
  constructor (options = {}) {
    this._urlSwapList = options.urlSwapList || []
    this._redactor = jsonRedactor({
      watchKeys: options.omitList,
      error: redactMessage
    })
  }

  encode (sp) {
    let prefix
    let operation = decodeURIComponent(sp.operation)
    for (let i = 0; i < this._urlSwapList.length; i++) {
      operation = operation.replace(this._urlSwapList[i], redactMessage)
    }

    if (sp.parentId && sp.duration != null) {
      prefix = `{"traceId":"${sp.traceId}","spanId":"${sp.spanId}","parentId":"${sp.parentId}","operation":"${operation}","start":${sp.start},"duration":${sp.duration}`
    } else if (sp.parentId) {
      prefix = `{"traceId":"${sp.traceId}","spanId":"${sp.spanId}","parentId":"${sp.parentId}","operation":"${operation}","start":${sp.start}`
    } else if (sp.duration != null) {
      prefix = `{"traceId":"${sp.traceId}","spanId":"${sp.spanId}","operation":"${operation}","start":${sp.start},"duration":${sp.duration}`
    } else {
      prefix = `{"traceId":"${sp.traceId}","spanId":"${sp.spanId}","operation":"${operation}","start":${sp.start}`
    }

    let tags = ''
    let logs = ''
    let baggage = ''

    if (sp.tags) {
      if (sp.tags['http.url']) {
        let url = decodeURIComponent(sp.tags['http.url'])
        for (let i = 0; i < this._urlSwapList.length; i++) {
          url = url.replace(this._urlSwapList[i], redactMessage)
        }
        sp.tags['http.url'] = url
      }
      tags = `,"tags":${stringify(this._redactor(sp.tags)[0])}`
    }

    if (sp.logs) {
      logs = `,"logs":${stringify(this._redactor(sp.logs)[0])}`
    }

    if (sp.baggage) {
      baggage = `,"baggage":${stringify(this._redactor(sp.baggage)[0])}`
    }

    return `${prefix}${tags}${logs}${baggage}}${os.EOL}`
  }
}

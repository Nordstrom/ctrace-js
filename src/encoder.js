import os from 'os'
import url, {URL} from 'url'
const redactMessage = '***'
const stringify = JSON.stringify

import find from 'lodash.find'
import map from 'lodash.map'
import isObject from 'lodash.isobject'
import forOwn from 'lodash.forown'

export default class Encoder {
  constructor (options = {}) {
    this.watchKeys = options.omitList || []
    this.error = redactMessage
  }

  encode (sp) {
    let prefix
    let operation = decodeURIComponent(sp.operation)
    for (let i = 0; i < this.watchKeys.length; i++) {
      operation = operation.replace(this.watchKeys[i], this.error)
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
        sp.tags['http.url'] = this.parseUrl(sp.tags['http.url'])
      }
      tags = `,"tags":${stringify(this.clean(sp.tags)[0])}`
    }

    if (sp.logs) {
      logs = `,"logs":${stringify(this.clean(sp.logs)[0])}`
    }

    if (sp.baggage) {
      baggage = `,"baggage":${stringify(this.clean(sp.baggage)[0])}`
    }

    return `${prefix}${tags}${logs}${baggage}}${os.EOL}`
  }

  parseUrl (uri) {
    try {
      return this.parseV2Url(uri)
    } catch (e) {
      return this.parseV1Url(uri)
    }
    return uri
  }

  parseV2Url (uri) {
    let myURL = new URL(uri)
    myURL.username = myURL.username ? '***' : null
    myURL.password = myURL.password ? '***' : null
    let query = myURL.searchParams
    for (const name of query.keys()) {
      if (this.findMatch(name)) {
        myURL.searchParams.set(name, '***')
      }
    }

    return myURL.toString()
  }

  parseV1Url (uri) {
    let myURL = url.parse(uri, true)
    myURL.auth = myURL.auth ? '***:***' : null
    myURL.query = this.clean(myURL.query)[0]
    myURL.search = undefined

    return url.format(myURL)
  }

  findMatch (el) {
    const watchKeys = this.watchKeys
    return !!find(watchKeys, function (k) {
      if (typeof (k) === 'string') {
        return el === k
      } else if (typeof (k) === 'object') {
        // if regex
        return el.match(k)
      }
      return false
    })
  }

  clean () {
    const gcache = []
    const error = this.error
    const findMatch = this.findMatch
    const that = this

    function internalSwap (el) {
      if (Array.isArray(el)) {
        el = map(el, function (i) {
          return internalSwap(i)
        })
      } else if (isObject(el)) {
        const index = gcache.indexOf(el)
        if (index !== -1) {
          return '[circular]'
        }
        gcache.push(el)
        const cache = {}
        forOwn(el, function (v, k) {
          if (!findMatch.apply(that, [k])) {
            cache[k] = internalSwap(v)
          } else {
            cache[k] = error
          }
        })
        el = cache
      }
      return el
    }

    let cleaned = {}
    forOwn(arguments, function (v, k) {
      cleaned[k] = internalSwap(v)
    })
    return cleaned
  }
}

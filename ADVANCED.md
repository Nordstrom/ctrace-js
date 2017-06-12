# ctrace - Advanced Usage
The following are examples of advanced usage.  In these examples, tracing is done
manually rather than using auto-instrumentation middleware.

> NOTE: If you are using auto-instrumentation middleware (express, request, etc) there is no need to use manually start and finish spans.

## Start Client Span
If you want to track a call to a downstream REST service, start a new client Span like this.

```js
const span = tracer.startSpan('RegisterUser', {
  // Apply Standard Tags
  tags: {
    'span.kind': 'client',
    'component': 'UserAdapter',
    'peer.hostname': 'my-registry.net',
    'peer.port': '443',
    'peer.service': 'UserRegistry',
    'http.method': 'POST',
    'http.url': 'https://my-registry.net/users?apikey=293283209'
  }
})
```

## Inject Context
The downstream REST service will want to use this span as its parent.  We will inject the span
context into the HTTP Headers for this purpose as follows.

```js
const headers = {}
tracer.inject(span, Tracer.FORMAT_HTTP_HEADERS, headers)
```

## Start Server Span
The called REST service can start a server Span as follows.

```js
const express = require('express')
const app = express()
const tracer = require('ctrace')

app.post('/users', (req, res) => {
  const context = tracer.extract(tracer.FORMAT_HTTP_HEADERS, req.headers)
  const span = tracer.startSpan('RegisterUser', {
    childOf: context,  // include parent context
    // Standard Tags
    tags: {
      'span.kind': 'server',
      'component': 'UserRegistryController',
      'peer.ipv4': req.ip,
      'http.method': req.method,
      'http.url': req.url
    }
  })

  ...

})
```

## Finish Server Span
If the REST service call completes successfully on the server, add tag for
status and finish the span.


```js
app.post('/users', (req, res) => {

  ...

  span.addTags({'http.status_code': 200})
  span.finish()
  res.status(200).json(result)
})
```

If it completes with an error, , do the following to add tags for status code,
error=true, recommended error_details, and finish the span.

```js
app.post('/users', (req, res) => {

  ...

  span.addTags({
    'http.status_code': 500,
    'error': true,
    'error_details': error.toString()
  })
  span.finish()
  res.status(500).json(error)
})

```

## Finish Client Span
If the call to the downstream REST service completes successfully, finish the client Span like this.

```js
span.addTags({'http.status_code': 200})
span.finish()
```

If the call completes with an error, finish the client Span like this.

```js
span.addTags({
  // Standard Tags and Recommended error_details
  'http.status_code': 500,
  'error': true,
  'error_details': err.toString()
})
span.finish()
```

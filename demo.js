
const express = require('express')
const rp = require('request-promise')
const app = express()
const tracer = require('./')
const tr = tracer.request

tr.init(rp)

app.use(tracer.express())

function send (ctx, uri, region) {
  return tr({method: 'GET', url: `${uri}?region=${region}`})
}

app.get('/gw', (req, res) => {
  console.log(req.query.url)
  send(req.traceContext, decodeURI(req.query.url), decodeURI(req.query.region))
    .then(rtn => {
      res.send(rtn)
    })
    .catch(e => {
      res.status(500).send(e.err || e)
    })
})

app.get('/ok', (req, res) => {
  let span = req.traceContext.span
  let region = req.query.region
  let msg = `Hello ${region}!`
  span.log({event: 'generate-msg', message: msg})
  res.send(msg)
})

app.listen(80, function () {
  console.log('Hello Gateway Started on port 80...')
})

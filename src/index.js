import * as opentracing from 'opentracing'
import GlobalTracer from './globalTracer'
import express from './middleware/express'
import request from './middleware/request'

const tracer = Object.assign(new GlobalTracer(), opentracing)
tracer.express = express
tracer.request = request

export default tracer

'use strict'
const stream = require('stream')
const LOG      = 'log'
const REQUEST  = 'request'
const RESPONSE = 'response'
const ERROR    = 'error'
const OPS      = 'ops'

const formatOps = (data) => {
  return {
    event: 'ops',
    rss: data.proc.mem.rss,
    uptime: data.proc.uptime,
    load: data.os.load
  }
}

const formatResponse = (data) => {
  if (process.env.NODE_ENV === 'production') {
    return {
      event: 'response',
      id: data.id,
      instance: data.instance,
      method: data.method,
      path: data.path,
      query: data.query,
      responseTime: data.responseTime,
      responseSentTime: data.responseSentTime,
      statusCode: data.statusCode,
      httpVersion: data.httpVersion,
      source: data.source,
      route: data.route,
      config: data.config
    }
  }

  return {
    event: 'response',
    method: data.method,
    path: data.path,
    query: data.query,
    responseTime: data.responseTime,
    statusCode: data.statusCode,
  }
}

class HapiLoggerPlugin extends stream.Writable {
  constructor(logger) {
    super({ objectMode: true })
    this.logger = logger
  }

  _write(data, encoding, callback) {
    switch (data.event) {
      case RESPONSE:
        this.logger.debug(formatResponse(data))
        break
      case OPS:
        this.logger.debug(formatOps(data))
        break
      case ERROR:
        this.logger.error(data)
        break
      case LOG:
      case REQUEST:
        this.logger.info(data)
        break
      default:
        this.logger.info(data)
    }
    callback(null, data)
  }
}

module.exports = HapiLoggerPlugin

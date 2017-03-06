const winston = require('winston')

const formatter = (item) => {
  if (process.env.NODE_ENV === 'production') {
    const message = JSON.stringify({
      level: item.level,
      message: item.message,
      data: item.meta
    })
    return `[${item.level.toUpperCase()}] ${message}`
  } else {
    let message = item.message ? ` ${item.message}` : ''
    let meta = (Object.keys(item.meta).length > 0) ? ` ${JSON.stringify(item.meta)}` : ''
    return `[${item.level.toUpperCase()}]${message}${meta}`
  }
}

const createLogger = (logLevel) => {
  let transports = [
    new winston.transports.Console({
      level: logLevel || 'debug',
      formatter: formatter
    })
  ]

  let logger = new winston.Logger({ transports })

  // log to stdout when there are errors
  logger.on('error', err => console.log(err))

  return logger
}

module.exports = createLogger

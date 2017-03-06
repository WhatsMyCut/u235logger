# U235 Logger

If your service needs a logger, this package defines a standard useful format along with a plugin for services that use the Hapi framework. This package uses `winston` as a base logger.

## Raw Usage

```js
const { createLogger } = require('u235logger')
const logger = createLogger('info')
logger.info('Log messages in stdout!')
```

## Hapi Plugin Usage

Works in conjunction with the `good` module to log Hapi internal events to CloudWatch

```js
const { createLogger, HapiLoggerPlugin } = require('u235logger')
const logger = createLogger('debug')
const server = new Hapi.Server()

server.register({
  register: require('good'),
  options: {
    reporters: {
      console: [new HapiLoggerPlugin(logger)]
    }
  }
})
```

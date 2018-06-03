'use strict'

const winston = require('winston')
const config = require('./configs/config')

winston.remove(winston.transports.Console)
winston.add(winston.transports.Console, {
  timestamp: true,
  json: true,
  stringify: config.NODE_ENV === 'production'
})

winston.setLevels(winston.config.syslog.levels)

module.exports = winston

'use strict'

const winston = require('winston')
const config = require('./configs/config')
const disableConsole = config.NODE_ENV !== 'dev'

winston.add(winston.transports.File, { filename: config.LOG_FILE })

// TODO: install logger addon on heroku
// if (disableConsole) winston.remove(winston.transports.Console)

// Set log levels according to syslog ones
// { emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }
winston.setLevels(winston.config.syslog.levels)

module.exports = winston

'use strict'

const defaultConf = {
  APP: 'BotFit',
  PORT: 8080,
  NODE_ENV: 'dev',
  USERNAME: 'baboo',
  PASSWD: 'botfit'
}

let config = {}
Object.keys(defaultConf).forEach(key => {
  config[key] = process.env[key] || defaultConf[key]
})

module.exports = config

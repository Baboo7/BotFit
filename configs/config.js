'use strict'

let fs = require('fs')
let path = require('path')

let devConfig = {}

let pathToModule = path.join(__dirname, 'dev.config.js')
if (fs.existsSync(pathToModule)) devConfig = require(pathToModule)

const structConfig = require('./struct.config')

let config = {}
Object.keys(structConfig).forEach(key => {
  config[key] = process.env[key] || devConfig[key]
})

module.exports = config

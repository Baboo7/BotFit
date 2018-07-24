'use strict'

const config = require('./configs/config')
const logger = require('./logger')
const cron = require('./cron')

// Launch cron jobs
cron.launchJobs()

// Set up of the server
let path = require('path')
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let router = require('./router')

app.use(bodyParser.urlencoded({ extended: 'true' }))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', router)

app.listen(config.PORT)

logger.log('info', `server listening on port ${config.PORT}`)

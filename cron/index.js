'use strict'

const cron = require('cron')

const config = require('../configs/config')
const logger = require('../logger')
const system = require('../utils/system')
const nt = require('../utils/nativeTypes')

let cronJobs = {}
let modules = system.loadModulesFromFolder(__dirname, ['index.js'])
Object.keys(modules)
  .forEach((key, idx, arr) => {
    let cronJob = modules[key]

    let cronProp = {
      cronTime: cronJob.cronTime,
      onTick: cronJob.onTick,
      start: false,
      timeZone: config.TZ
    }

    cronJobs[key] = new cron.CronJob(cronProp)
  })

function launchJobs () {
  Object.keys(cronJobs).forEach(key => {
    let cronJob = cronJobs[key]
    if (nt.isUndefined(cronJobs[key].running)) {
      cronJob.start()
      logger.log('info', `job ${key} launched`)
    }
  })
}

module.exports = {
  launchJobs
}

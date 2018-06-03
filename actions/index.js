'use strict'

const path = require('path')
const system = require('../utils/system')

let handlers = {}
// Load the action handlers
handlers = system.loadModulesFromFolder(path.join(__dirname, 'handlers'))

/* Handle triggered actions.

  PARAM
    interaction (object): see Interaction class

  RETURN
    none
*/
const actionHandler = interaction => {
  let handler = handlers[interaction.action]

  if (handler) return handler(interaction)
  else return Promise.reject(new Error(`unhandled action '${interaction.action}'`))
}

module.exports = actionHandler

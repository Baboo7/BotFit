'use strict'

const handlers = require('./handlers')

/* Handle triggered actions.

  PARAM
    interaction (object): see Interaction class

  RETURN
    none
*/
const actionHandler = interaction => {
  let handler = handlers[interaction.action]

  if (handler) return handler(interaction)

  throw new Error(`unhandled action '${interaction.action}'`)
}

module.exports = actionHandler

'use strict'

const logger = require('../logger')
const actionHandler = require('../actions')
const Interaction = require('../actions/interaction.class')

/* Handle requests from agent.

  PARAM
    req (object)
    res (object)

  RETURN
    none
*/
const webhook = (req, res) => {
  if (!req.body.sessionId || !req.body.result || !req.body.result.contexts || !req.body.result.action || !req.body.result.parameters || !req.body.result.fulfillment || !req.body.result.fulfillment.messages || !req.body.originalRequest || !req.body.originalRequest.data || !req.body.originalRequest.data.sender || !req.body.originalRequest.data.sender.id) {
    logger.log('error', 'missing parameters from body request', { request: req.body })
    return res.json({ })
  }

  let options = {
    fbid: req.body.originalRequest.data.sender.id,
    sessionId: req.body.sessionId,
    contexts: req.body.result.contexts,
    action: req.body.result.action,
    parameters: req.body.result.parameters,
    messages: req.body.result.fulfillment.messages
  }

  let interaction = new Interaction(options)

  try {
    actionHandler(interaction)
      .then(() => {
        res.json(interaction.getResponse())
      })
      .catch(e => {
        logger.log('error', e)
        res.json(interaction.getResponse())
      })
  } catch (e) {
    logger.log('error', e)
    res.json(interaction.getResponse())
  }
}

module.exports = webhook

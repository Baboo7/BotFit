'use strict'

const logger = require('../../logger')
const nt = require('../../utils/nativeTypes')
const multiresa = require('../../utils/multiresa')

/* Book a slot.

  PARAM
  interaction: (object) see Interaction class
    parameters: (object) must contain
      date: (string) day to book the slot
      time: (string) time of the slot

  RETURN
    (Promise) RESOLVE with NO PARAMETER / REJECT with an ERROR
*/
const handler = interaction => {
  return new Promise((resolve, reject) => {
    let dateString = interaction.getParameter('date') + 'T' + interaction.getParameter('time') + 'Z'
    let dateTime = new Date(dateString)
    let slotAction = interaction.getParameter('slotAction')

    multiresa
      .getLoggedinCookie()
      .then(cookie => multiresa.manageSlot({
        cookie,
        action: multiresa.slotActions[slotAction],
        dateTime
      }))
      .then(res => {
        let data = multiresa.parseData(res.data)[0]
        let speech = `${nt.unicodeToUTF8(data.infos)}`

        interaction.setSpeech(speech)
        let message = interaction.createTextMessage(speech)
        interaction.setMessages([ message ])
        resolve()
      })
      .catch(e => {
        logger.log('error', e)
        reject(e)
      })
  })
}

module.exports = handler

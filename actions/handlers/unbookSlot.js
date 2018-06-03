'use strict'

const logger = require('../../logger')
const nt = require('../../utils/nativeTypes')
const multiresa = require('../../utils/multiresa')

/* Unbook a slot.

  PARAM
  interaction: (object) see Interaction class
    parameters: (object) must contain
      day: (string) day to book the slot
      month: (string) day to book the slot
      year: (string) day to book the slot
      time: (string) day to book the slot

  RETURN
    (Promise) RESOLVE with NO PARAMETER / REJECT with an ERROR
*/
const handler = interaction => {
  return new Promise((resolve, reject) => {
    let date = interaction.getParameter('date')
    let time = interaction.getParameter('time')

    multiresa
      .getLoggedinCookie()
      .then(cookie => multiresa.manageSlot({
        cookie,
        action: multiresa.slotActions.UNBOOK,
        date,
        time
      }))
      .then(res => {
        let data = multiresa.parseData(res.data)[0]
        data.infos = `${nt.unicodeToUTF8(data.infos)} (le ${date.split('-').reverse().slice(0, 2).join('/')} à ${time.substring(0, 2)}:${time.substring(2, 4)})`
        interaction.setMessages([interaction.createTextMessage(data.infos)])
        resolve()
      })
      .catch(e => {
        logger.log('error', e)
        reject(e)
      })
  })
}

module.exports = handler

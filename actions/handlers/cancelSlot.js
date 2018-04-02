'use strict'

const axios = require('axios')
const logger = require('../../logger')

/* Book a slot.

  PARAM
  interaction: (object) see Interaction class
    parameters: (object) must contain
      date: (string) day to retrieve the available slots

  RETURN
    (Promise) RESOLVE with NO PARAMETER / REJECT with an ERROR
*/
const handler = interaction => {
  return new Promise((resolve, reject) => {
    let date = interaction.getParameter('date')
    let time = interaction.getParameter('time')
    axios
      .get(`http://www.multiresa.fr/~reebok2/app/req/requestResa.php?action=sendresa&idcompte=884&idMembre=13230&mailMembre=baptiste.studer@laposte.net&activite=43&lejour=${date}&lecreno=${time}`)
      .then(res => {
        resolve()
      })
      .catch(e => {
        logger.log('error', e)
        reject(e)
      })
  })
}

module.exports = handler

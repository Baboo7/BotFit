'use strict'

const logger = require('../../logger')
const nt = require('../../utils/nativeTypes')
const multiresa = require('../../utils/multiresa')

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

/* Get the available slots.

  PARAM
  interaction: (object) see Interaction class
    parameters: (object) must contain
      date: (string) day to retrieve the available slots

  RETURN
    (Promise) RESOLVE with NO PARAMETER / REJECT with an ERROR
*/
const handler = interaction => {
  return new Promise((resolve, reject) => {
    let date = new Date(interaction.getParameter('date'))

    multiresa
      .getAvailableSlots(date)
      .then(slots => {

        let speech = ''
        slots.forEach(slot => {
          speech += `${slot.horaireD}, `
        })

        if (nt.isBlank(speech)) speech = 'Toutes les sessions ont été réservées, vous vous retrouvez la queue entre les jambes comme un baptou fragile.'
        else speech = `Les sessions disponibles de ${days[date.getDay()]} sont à ` + speech

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

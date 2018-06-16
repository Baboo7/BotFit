'use strict'

const logger = require('../../logger')
const nt = require('../../utils/nativeTypes')
const multiresa = require('../../utils/multiresa')

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

/* Get the reservations.

  PARAM
  interaction (object): see Interaction class

  RETURN
    (Promise) RESOLVE with NO PARAMETER / REJECT with an ERROR
*/
const handler = interaction => {
  return new Promise((resolve, reject) => {
    multiresa
      .getBookedSlots()
      .then(bookedSlot => {
        let speech = ''
        bookedSlot.forEach(slot => {
          let date = new Date(slot.ladate)
          let day = days[date.getDay()]
          let month = months[date.getMonth()]

          speech += `le ${day} ${date.getDate()} ${month} à ${slot.horaireD}, `
        })

        if (nt.isBlank(speech)) {
          speech = 'Aucune session de prévue pour le moment, vous feriez mieux de vous mettre au sport. ' +
            'Quand vous passez dans les couloirs les Sipionautes ils disent oh le gros sac regardez le gros sac et après ils rigolent de vous.' +
            speech
        }
        else speech = `Vos réservations sont ` + speech

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

'use strict'

const axios = require('axios')
const logger = require('../../logger')
const multiresa = require('../../utils/multiresa')

/* Get the reservations.

  PARAM
  interaction (object): see Interaction class

  RETURN
    (Promise) RESOLVE with NO PARAMETER / REJECT with an ERROR
*/
const handler = interaction => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://www.multiresa.fr/~reebok2/app/req/reloadResa.php?idcompte=884&idMembre=13230&mailMembre=baptiste.studer@laposte.net&activite=43&zedate=${new Date().toJSON().substring(0, 10)}&typecreno=1`)
      .then(res => {
        let slots = multiresa.parseData(res.data)

        let items = []
        slots
          .filter(slot => multiresa.isSlotBooked(slot))
          .sort((a, b) => a.lejour > b.lejour || (a.lejour === b.lejour && a.horaireD >= b.horaireD) ? 1 : -1)
          .forEach(slot => {
            let date = new Date(slot.ladate)
            let day = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'][date.getDay()]
            let diffDays = Math.ceil(Math.abs(date.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
            let subtitle = diffDays > 0 ? `Dans ${diffDays} jour` + (diffDays > 1 ? 's' : '') : `Aujourd'hui`

            items.push(interaction.createListItem({
              title: `${day} ${slot.lejour.substring(0, 2)} à ${slot.horaireD}`,
              subtitle,
              img: 'https://s2.qwant.com/thumbr/0x0/d/c/77ad88824d008dd938393d3d49f17d/b_1_q_0_p_0.jpg?u=https%3A%2F%2Fwww.brandworkz.com%2Fwp-content%2Fuploads%2F2016%2F08%2FReebok-logo.jpg',
              buttons: [{
                type: 'postback',
                payload: `unbook ${date.toJSON().substring(0, 10)} ${slot.horaireD.replace(':', '')}`,
                title: 'Se désinscrire' }]
            }))
          })

        if (items.length > 0) {
          items.push(interaction.createListItem({
            title: `Push the limits`,
            subtitle: `Prot & Fonte, Push up Push up`,
            img: 'https://s2.qwant.com/thumbr/0x0/d/c/77ad88824d008dd938393d3d49f17d/b_1_q_0_p_0.jpg?u=https%3A%2F%2Fwww.brandworkz.com%2Fwp-content%2Fuploads%2F2016%2F08%2FReebok-logo.jpg'
          }))
        }

        let messages = []
        while (items.length !== 0) {
          let nbItems = 4
          if (items.length === 5) nbItems = 3
          messages.push(interaction.createListMessage(items.slice(0, nbItems)))
          items = items.slice(nbItems)
        }
        interaction.setMessages(messages)
        resolve()
      })
      .catch(e => {
        logger.log('error', e)
        reject(e)
      })
  })
}

module.exports = handler

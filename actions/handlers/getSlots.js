'use strict'

const axios = require('axios')
const logger = require('../../logger')

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
    let date = interaction.getParameter('date')
    axios
      .get(`http://www.multiresa.fr/~reebok2/app/req/reloadResa.php?idcompte=884&idMembre=13230&mailMembre=baptiste.studer@laposte.net&activite=43&zedate=${date}&typecreno=1`)
      .then(res => {
        res.data = res.data.replace(/(\(|\)|\\|;)/g, '')
        let slots = JSON.parse(res.data)

        let items = []
        slots
          .filter(slot => slot.ladate === date && parseInt(slot.capacite) - parseInt(slot.nbresa) !== 0)
          .sort((a, b) => a.horaireD >= b.horaireD ? 1 : -1)
          .forEach(slot => {
            if (slot.ladispo === 'Ru00e9servu00e9') {
              items.push(interaction.createListItem({
                title: `${slot.horaireD} - ${slot.horaireF}`,
                subtitle: `Inscrit`,
                img: 'https://s2.qwant.com/thumbr/0x0/d/c/77ad88824d008dd938393d3d49f17d/b_1_q_0_p_0.jpg?u=https%3A%2F%2Fwww.brandworkz.com%2Fwp-content%2Fuploads%2F2016%2F08%2FReebok-logo.jpg',
                buttons: [{ type: 'postback', payload: `unbook ${date} ${slot.horaireD.replace(':', '')}`, 'title': '❎ Se désinscrire' }]
              }))
            } else {
              items.push(interaction.createListItem({
                title: `${slot.horaireD} - ${slot.horaireF}`,
                subtitle: `${parseInt(slot.capacite) - parseInt(slot.nbresa)} places restantes`,
                img: 'https://s2.qwant.com/thumbr/0x0/d/c/77ad88824d008dd938393d3d49f17d/b_1_q_0_p_0.jpg?u=https%3A%2F%2Fwww.brandworkz.com%2Fwp-content%2Fuploads%2F2016%2F08%2FReebok-logo.jpg',
                buttons: [{ type: 'postback', payload: `book ${date} ${slot.horaireD.replace(':', '')}`, 'title': `✅ S'inscrire` }]
              }))
            }
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

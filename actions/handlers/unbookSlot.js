'use strict'

const axios = require('axios')
const logger = require('../../logger')
const nt = require('../../utils/nativeTypes')
const login = require('../../utils/multiresa')

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

    login
      .getLoggedinCookie()
      .then(cookie => {
        return axios({
          url: 'http://www.multiresa.fr/~reebok2/app/req/requestResa.php',
          method: 'get',
          params: {
            action: 'cancelresa',
            idcompte: 884,
            idMembre: 13230,
            mailMembre: 'baptiste.studer@laposte.net',
            activite: 43,
            lejour: date,
            lecreno: time,
            effectif: 25
          },
          headers: {
            'Cookie': cookie,
            'Host': 'www.multiresa.fr',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Cache-Control': 'no-cache'
          }
        })
      })
      .then(res => {
        res.data = res.data.replace(/(\(|\)|\\|;)/g, '')
        let data = JSON.parse(res.data)[0]
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

'use strict'

const http = require('http')
const qs = require('qs')
const axios = require('axios')
const logger = require('../../logger')
const nt = require('../../utils/nativeTypes')

/* Book a slot.

  PARAM
  interaction: (object) see Interaction class
    parameters: (object) must contain
      date: (string) day to book the slot
      time: (string) day to book the slot

  RETURN
    (Promise) RESOLVE with NO PARAMETER / REJECT with an ERROR
*/
const handler = interaction => {
  return new Promise((resolve, reject) => {
    let date = interaction.getParameter('date')
    let time = interaction.getParameter('time')
    new Promise((resolve, reject) => {
      // Dont use axios for this specific request because it smells like shit
      // It is impossible to set 'Content-Type': 'application/x-www-form-urlencoded'
      // If so, data has to be parsed otherwise request turns from POST to GET
      let body = qs.stringify({
        username: 'baboo',
        passwd: 'botfit',
        op2: 'login',
        cbsecuritym3: 'cbm_23323ff8_1cc69acf_59c0cf3f3fde9c050e826888c4b2233f'
      })

      let options = {
        host: 'www.multiresa.fr',
        path: '/~reebok2/index.php/creation-de-compte/login.html',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(body),
          'User-Agent': 'Baboo Agent'
        }
      }

      let req = http.request(options, res => {
        res.on('data', () => { })
        res.on('end', () => { resolve(res) })
      })

      req.on('error', e => { reject(e) })

      req.write(body)
      req.end()
    })
      .then(res => {
        const cookie = res.headers['set-cookie'][1].split(';')[0]
        return axios({
          url: 'http://www.multiresa.fr/~reebok2/app/req/requestResa.php',
          method: 'get',
          params: {
            action: 'sendresa',
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

// 'http://www.multiresa.fr/~reebok2/app/req/requestResa.php?action=sendresa&idcompte=884&idMembre=13230&mailMembre=baptiste.studer@laposte.net&activite=43&lejour=2018-04-04&lecreno=1600&leprixu=0.00&leprixc=0.00&resadirect=0&lenomU= &leprenomU= &letelU= &lemailU= &lemultiU=undefined&effectif=25&callback=jQuery16408521369573265468_1522603068654&_=1522603080220'
// 'http://www.multiresa.fr/~reebok2/app/req/requestResa.php?action=cancelresa&idcompte=884&idMembre=13230&mailMembre=baptiste.studer@laposte.net&activite=43&lejour=2018-04-04&lecreno=1600&leprixu=0.00&leprixc=0.00&resadirect=0&lenomU= &leprenomU= &letelU= &lemailU= &lemultiU=undefined&effectif=25&callback=jQuery16408521369573265468_1522603068656&_=1522603117698'

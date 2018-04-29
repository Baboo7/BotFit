'use strict'

const http = require('http')
const qs = require('qs')
const axios = require('axios')
const cheerio = require('cheerio')

/* Get login cookie.

  PARAM

  RETURN
    (Promise) RESOLVE with COOKIE / REJECT with an ERROR
*/
const getLoggedinCookie = () => {
  return axios
    .get('http://www.multiresa.fr/~reebok2/')
    .then(res => {
      let resData = res.data
      let $ = cheerio.load(resData)
      return new Promise((resolve, reject) => {
        // Dont use axios for this specific request because it smells like shit
        // It is impossible to set 'Content-Type': 'application/x-www-form-urlencoded'
        // If so, data has to be parsed otherwise request turns from POST to GET
        let body = qs.stringify({
          'username': 'baboo',
          'passwd': 'botfit',
          'op2': 'login',
          'lang': 'french',
          'force_session': 1,
          'loginfrom': 'loginmodule',
          'return': $('input[name="return"]').val(),
          'cbsecuritym3': $('input[name="cbsecuritym3"]').val()
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
          res.on('end', () => {
            if (res.headers['set-cookie'].length <= 1) reject(new Error('Cookie could not be retrieved from server'))
            const cookie = res.headers['set-cookie'][1].split(';')[0]
            resolve(cookie)
          })
        })

        req.on('error', e => { reject(e) })

        req.write(body)
        req.end()
      })
    })
}

module.exports = {
  getLoggedinCookie
}

'use strict'

const moment = require('moment')
const logger = require('../logger')
const nt = require('../utils/nativeTypes')
const multiresa = require('../utils/multiresa')
const fb = require('../utils/fb')

const cronTime = '* 15 0 * * 1,5'

/**
 * Book session for each tuesday and friday.
 */
const onTick = () => {
    const date = moment().add(4, 'day').format('YYYY-MM-DD')
    const time = '12:30:00'
    const dateString = date + 'T' + time + 'Z'
    const dateTime = new Date(dateString)
    const action = multiresa.slotActions.BOOK

    multiresa
        .getLoggedinCookie()
        .then(cookie => multiresa.manageSlot({
            cookie,
            action,
            dateTime
        }))
        .then(res => {
            let data = multiresa.parseData(res.data)[0]
            let text = `${nt.unicodeToUTF8(data.infos)}`
            fb.sendText(text)
        })
        .catch(e => {
            logger.log('error', e)
            fb.sendText('Problème sur le serveur')
        })
}

module.exports = {
    cronTime,
    onTick
}

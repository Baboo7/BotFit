'use strict'

const axios = require('axios')
const config = require('../configs/config')

/*  Send text to user.
    ARGS
        text: (string)

    RETURN
        (Promise)
*/
const sendText = (text) => {
    let data = {
        'recipient': {
            'id': config.FB_ID
        },
        'message': {
            'text': text
        }
    }

  return sendToFacebookAPI(data)
}

/*  Send a message to a user.
    ARGS
        data: (string) message to send

    RETURN
        (Promise)
*/
const sendToFacebookAPI = data => {
    return new Promise((resolve, reject) => {
        axios
        .post(
            `https://graph.facebook.com/v2.6/me/messages?access_token=${config.FB_PAGE_TOKEN}`,
            JSON.stringify(data),
            { 'headers': { 'Content-Type': 'application/json' } }
        )
        .then(
            () => resolve(),
            (e) => {
                reject(e)
            })
        .catch(e => {
            reject(e)
        })
    })
}

module.exports = {
    sendText
}

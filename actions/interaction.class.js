'use strict'

// Define a webhook interaction.
class Interaction {
  constructor (options) {
    this.sessionId = options.sessionId
    this.contexts = Object.assign([ ], options.contexts)
    this.action = options.action
    this.parameters = Object.assign({ }, options.parameters)
    this.messages = Object.assign([ ], options.messages)

    this.speech = ''
    this.followupEvent = {
      data: { }
    }
  }

  /* Return a parameter.

  PARAM
    key (string): name of the parameter

  RETURN
    (string | undefined) the parameter value if exists
  */
  getParameter (key) {
    return this.parameters[key]
  }

  /* Conmpute the answer.

    PARAM
      none

    RETURN
      (object) contains the information to send back to the agent
  */
  getResponse () {
    let response = {
      contextOut: this.contexts,
      followupEvent: this.followupEvent,
      messages: this.messages,
      speech: this.speech
    }

    return response
  }

  /* Set the speech of the agent.

  PARAM
    speech: (string)

  RETURN
    none
  */
  setSpeech (speech) {
    this.speech = speech
  }

  /* Set the followup event.

  PARAM
    name (string): name of the event
    data (object): key-value representing the data held

  RETURN
    none
  */
  setFollowupEvent (name, data) {
    if (!data) data = { }

    this.followupEvent.name = name
    this.followupEvent.data = data
  }

  /* Create an text message.

  PARAM
    text (string)

  RETURN
    (object) text message
  */
  createTextMessage (text) {
    if (!text) throw new Error('no text provided')

    return {
      platform: 'facebook',
      type: 0,
      speech: text
    }
  }

  /* Create a card message.

  PARAM
    data (object):
      title (string): title of the card
      subtitle (string): subtitle of the card
      img (string): image url of the card
      buttons (object): see facebook doc

  RETURN
    (object) card message
  */
  createCard (data) {
    if (!data || !data.title || !data.subtitle || !data.img || !data.buttons) {
      throw new Error(`missing parameters in data: ${JSON.stringify(data)}`)
    }

    let card = {
      'title': data.title,
      'image_url': data.img,
      'subtitle': data.subtitle,
      'buttons': data.buttons
    }

    return card
  }

  /* Create a list item.

  PARAM
    data (object):
      title (string): title of the card
      subtitle (string): subtitle of the card
      img (string): image url
      buttons (object): see facebook doc

  RETURN
    (object) card message
  */
  createListItem (data) {
    if (!data || !data.title || !data.subtitle || !data.img) throw new Error(`missing parameters in data: ${JSON.stringify(data)}`)

    if (typeof data.buttons === 'undefined') data.buttons = []

    return {
      'title': data.title,
      'image_url': data.img,
      'subtitle': data.subtitle,
      'buttons': data.buttons
    }
  }

  /* Create a caroussel message.

  PARAM
    cards (array): cards to display

  RETURN
    (object) caroussel message
  */
  createCarousselMessage (cards) {
    if (!cards) {
      throw new Error(`missing 'card' parameter`)
    }

    let caroussel = {
      type: 4,
      platform: 'facebook',
      payload: {
        facebook: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: cards
            }
          }
        }
      }
    }

    return caroussel
  }

  /* Create a list message.

  PARAM
    items (array): items to display

  RETURN
    (object) list message
  */
  createListMessage (items) {
    if (!items) throw new Error(`missing 'card' parameter`)

    return {
      type: 4,
      platform: 'facebook',
      payload: {
        facebook: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'list',
              top_element_style: 'compact',
              elements: items
            }
          }
        }
      }
    }
  }

  /* Set the url of the webview button.

  PARAM
    url (string)

  RETURN
    -
  */
  setWebviewButtonUrl (url) {
    for (let i = 0; i < this.messages.length; i++) {
      let message = this.messages[i]
      if (message.type === 4 && message.payload && message.payload.facebook && message.payload.facebook.attachment && message.payload.facebook.attachment.payload && message.payload.facebook.attachment.payload.template_type && message.payload.facebook.attachment.payload.template_type === 'button' && message.payload.facebook.attachment.payload.buttons) {
        var button = message.payload.facebook.attachment.payload.buttons.find(m => m.type === 'web_url')
      }
    }

    if (typeof button === 'undefined') throw new Error(`no webview button found`)

    button.url = url
  }

  /* Add a new message in the stack.

  PARAM
    message (object)

  RETURN
    none
  */
  addMessage (message) {
    this.messages.push(message)
  }

  /* Set the new message stack.

  PARAM
    messages (array of objects): new message stack

  RETURN
    none
  */
  setMessages (messages) {
    this.messages = messages
  }
}

module.exports = Interaction

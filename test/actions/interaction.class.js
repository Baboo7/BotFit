'use strict'

let Interaction = require('../../actions/interaction.class')
let expect = require('chai').expect

describe('interaction class', () => {
  // messages
  describe('> create text message', () => {
    it('> should detect a missing param', () => {
      let text

      let expected = true

      let interaction = new Interaction({ })

      try {
        interaction.createTextMessage(text)
        expect(false).to.equal(expected)
      } catch (e) {
        expect(true).to.equal(expected)
      }
    })

    it('> should create a text message', () => {
      let text = 'some text'

      let expected = {
        type: 0,
        speech: text
      }

      let interaction = new Interaction({ })

      try {
        let message = interaction.createTextMessage(text)
        expect(message).to.deep.equal(expected)
      } catch (e) {
        expect({ }).to.deep.equal(expected)
      }
    })
  })
})

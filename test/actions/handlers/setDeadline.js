'use strict'

let Interaction = require('../../../actions/interaction.class')
let handler = require('../../../actions/handlers/setDeadline')
let expect = require('chai').expect

describe('HDL setDeadline', () => {
  it('> should raise an error for missing parameter', done => {
    let options = {
      fbid: '',
      sessionId: '',
      contexts: [ ],
      action: '',
      parameters: { },
      messages: [ ]
    }

    let expected = true

    let interaction = new Interaction(options)

    handler(interaction)
      .then(() => {
        expect(!expected).to.equal(expected)
        done()
      })
      .catch(e => {
        console.log(e)
        expect(expected).to.equal(expected)
        done()
      })
  })

  it('> should raise an error for invalid parameter', done => {
    let options = {
      fbid: '',
      sessionId: '',
      contexts: [ ],
      action: '',
      parameters: {
        deadline: 'INVALID_VALUE'
      },
      messages: [ ]
    }

    let expected = true

    let interaction = new Interaction(options)

    handler(interaction)
      .then(() => {
        expect(!expected).to.equal(expected)
        done()
      })
      .catch(e => {
        console.log(e)
        expect(expected).to.equal(expected)
        done()
      })
  })
})

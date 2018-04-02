'use strict'

const bookSlot = require('./bookSlot')
const getReservations = require('./getReservations')
const getSlots = require('./getSlots')
const unbookSlot = require('./unbookSlot')

const actions = {
  bookSlot,
  getReservations,
  getSlots,
  unbookSlot
}

module.exports = actions

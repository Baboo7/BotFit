'use strict'

let nativeTypes = require('../../utils/nativeTypes')
let expect = require('chai').expect

describe('MOD nativeTypes', () => {
  describe('> check properties of an object', () => {
    it('> should find a deep property in an object', () => {
      let obj = {
        a: {
          b: {
            c: true
          }
        }
      }
      let props = 'a.b.c'

      let expected = true
      expect(nativeTypes.isPropDefined(obj, props)).to.equal(expected)
    })

    it('> should not find a deep property in an object', () => {
      let obj = {
        a: {
          b: {
            c: true
          }
        }
      }
      let props = 'a.b.c.d'

      let expected = false
      expect(nativeTypes.isPropDefined(obj, props)).to.equal(expected)
    })

    it('> should find a property described by a string', () => {
      let obj = { a: true }
      let props = 'a'

      let expected = true
      expect(nativeTypes.arePropsDefined(obj, props)).to.equal(expected)
    })

    it('> should find a properties described by an array', () => {
      let obj = { a: true, b: true, c: { c: true } }
      let props = ['a', 'b', 'c.c']

      let expected = true
      expect(nativeTypes.arePropsDefined(obj, props)).to.equal(expected)
    })

    it('> should not find a property in an array', () => {
      let obj = { a: true, b: true, c: { c: true } }
      let props = ['a', 'b', 'c.d']

      let expected = false
      expect(nativeTypes.arePropsDefined(obj, props)).to.equal(expected)
    })
  })

  describe('> getProp', () => {
    it('> should not find a property described by a string', () => {
      let obj = { a: true }
      let path = 'b'

      let expected
      expect(nativeTypes.getProp(obj, path)).to.equal(expected)
    })

    it('> should not find a property described by a string', () => {
      let obj = { a: true }
      let path = 'a.b'

      let expected
      expect(nativeTypes.getProp(obj, path)).to.equal(expected)
    })

    it('> should find a property described by a string', () => {
      let obj = { a: true }
      let path = 'a'

      let expected = true
      expect(nativeTypes.getProp(obj, path)).to.equal(expected)
    })

    it('> should find a property described by a string', () => {
      let obj = { a: { b: true } }
      let path = 'a.b'

      let expected = true
      expect(nativeTypes.getProp(obj, path)).to.equal(expected)
    })
  })
})

/* global describe, beforeEach, it, expect */
const { encode, decode } = require('../index')

describe('JSON conversion', () => {
  let encodedResult, result, original

  describe('When an object containing a boolean is used', () => {
    beforeEach(() => {
      original = {
        value: true
      }

      encodedResult = encode(original)
    })

    it('should create a buffer', () => {
      expect(Buffer.isBuffer(encodedResult)).toBe(true)
    })

    describe('when decodeded', () => {
      beforeEach(() => {
        result = decode(encodedResult)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(true)
      })
    })
  })

  describe('when an object containing a string is used', () => {
    beforeEach(() => {
      original = {
        value: 'foobar'
      }

      encodedResult = encode(original)
    })

    it('should create a buffer', () => {
      expect(Buffer.isBuffer(encodedResult)).toBe(true)
    })

    describe('when decodeded', () => {
      beforeEach(() => {
        result = decode(encodedResult)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe('foobar')
      })
    })
  })

  describe('when an object containing an array of strings is used', () => {
    beforeEach(() => {
      original = {
        value: ['foo', 'bar', 'baz']
      }

      encodedResult = encode(original)
    })

    it('should create a buffer', () => {
      expect(Buffer.isBuffer(encodedResult)).toBe(true)
    })

    describe('when decodeded', () => {
      beforeEach(() => {
        result = decode(encodedResult)
      })

      it('should have the correct value length', () => {
        expect(result.value.length).toBe(3)
      })
    })
  })

  describe('when an object containing an object is used', () => {
    beforeEach(() => {
      original = {
        value: {
          foo: 'bar',
          test: false
        }
      }

      encodedResult = encode(original)
    })

    it('should create a buffer', () => {
      expect(Buffer.isBuffer(encodedResult)).toBe(true)
    })

    describe('when decodeded', () => {
      beforeEach(() => {
        result = decode(encodedResult)
      })

      it('should have the correct foo value', () => {
        expect(result.value.foo).toBe('bar')
      })

      it('should have the correct test value', () => {
        expect(result.value.test).toBe(false)
      })
    })
  })

  describe('when an object using a number is used', () => {
    beforeEach(() => {
      original = {
        value: 230
      }

      encodedResult = encode(original)
    })

    it('should create a buffer', () => {
      expect(Buffer.isBuffer(encodedResult)).toBe(true)
    })

    describe('when decodeded', () => {
      beforeEach(() => {
        result = decode(encodedResult)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(230)
      })
    })
  })

  describe('when array is provided', () => {
    beforeEach(() => {
      original = [230]

      encodedResult = encode(original)
    })

    it('should create a buffer', () => {
      expect(Buffer.isBuffer(encodedResult)).toBe(true)
    })

    describe('when decodeded', () => {
      beforeEach(() => {
        result = decode(encodedResult)
      })

      it('should have the correct value', () => {
        expect(result[0]).toBe(230)
      })
    })
  })

  describe('when number is provided', () => {
    beforeEach(() => {
      original = 230

      encodedResult = encode(original)
    })

    it('should create a buffer', () => {
      expect(Buffer.isBuffer(encodedResult)).toBe(true)
    })

    describe('when decodeded', () => {
      beforeEach(() => {
        result = decode(encodedResult)
      })

      it('should have the correct value', () => {
        expect(result).toBe(230)
      })
    })
  })

  describe('when string is provided', () => {
    beforeEach(() => {
      original = 'foobar'

      encodedResult = encode(original)
    })

    it('should create a buffer', () => {
      expect(Buffer.isBuffer(encodedResult)).toBe(true)
    })

    describe('when decodeded', () => {
      beforeEach(() => {
        result = decode(encodedResult)
      })

      it('should have the correct value', () => {
        expect(result).toBe('foobar')
      })
    })
  })
})

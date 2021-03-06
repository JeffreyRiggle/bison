import {
  encodeKeyValuePair,
  encodeValue
} from '../encodeUtils'

import {
  undefinedType,
  nullType,
  smallStringType,
  stringType,
  booleanType,
  numberType,
  objectKey,
  smallArrayType,
  smallObjectType,
  nanoNumberType,
  smallNumberType,
  floatType,
  doubleType,
  dateType,
  largeNumberType,
  largeStringType
} from '../constants'

describe('encode util', () => {
  let result: any

  describe('when a undefined is provided', () => {
    beforeEach(() => {
      result = encodeValue(Buffer.alloc(0), undefined)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(undefinedType)
    })
  })

  describe('when a null is provided', () => {
    beforeEach(() => {
      result = encodeValue(Buffer.alloc(0), null)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(nullType)
    })
  })

  describe('when a boolean is provided', () => {
    describe('when value is true', () => {
      beforeEach(() => {
        result = encodeValue(Buffer.alloc(0), true)
      })

      it('should have the correct type', () => {
        expect(result[0]).toBe(booleanType)
      })

      it('should have the correct value', () => {
        expect(result[1]).toBe(1)
      })
    })

    describe('when value is false', () => {
      beforeEach(() => {
        result = encodeValue(Buffer.alloc(0), false)
      })

      it('should have the correct type', () => {
        expect(result[0]).toBe(booleanType)
      })

      it('should have the correct value', () => {
        expect(result[1]).toBe(0)
      })
    })
  })

  describe('when a string is provided', () => {
    const original = 'foobar'

    beforeEach(() => {
      result = encodeValue(Buffer.alloc(0), original)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(smallStringType)
    })

    it('should have the correct length', () => {
      expect(result[1]).toBe(original.length)
    })

    it('should have the correct string', () => {
      expect(result.toString('utf8', 2)).toBe(original)
    })
  })

  describe('when a long string is provided', () => {
    const original = 'Bacon ipsum dolor amet pork belly tongue pancetta turducken, bresaola shank meatball fatback salami sirloin ground round. Pork loin shankle strip steak salami chicken sausage prosciutto flank. Andouille salami corned beef, prosciutto chislic turducken shank doner jerky kielbasa pork loin bresaola chuck burgdoggen. Cupim ground round pork belly ham, biltong rump frankfurter bresaola shank shankle andouille fatback.'

    beforeEach(() => {
      result = encodeValue(Buffer.alloc(0), original)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(stringType)
    })

    it('should have the correct length', () => {
      expect(result.readInt16LE(1)).toBe(original.length)
    })

    it('should have the correct string', () => {
      expect(result.toString('utf8', 3)).toBe(original)
    })
  })

  describe('when a very large string is provided', () => {
    let original: string

    beforeEach(() => {
      for (let i = 0; i < 65536; i++) {
        original += '' + i;
      }

      result = encodeValue(Buffer.alloc(0), original)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(largeStringType)
    })

    it('should have the correct length', () => {
      expect(result.readInt32LE(1)).toBe(original.length)
    })

    it('should have the correct string', () => {
      expect(result.toString('utf8', 5)).toBe(original)
    })
  })

  describe('when a nano number is provided', () => {
    beforeEach(() => {
      result = encodeValue(Buffer.alloc(0), 6)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(nanoNumberType)
    })

    it('should have the correct value', () => {
      expect(result.readInt8(1)).toBe(6)
    })
  })

  describe('when a small number is provided', () => {
    beforeEach(() => {
      result = encodeValue(Buffer.alloc(0), 2000)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(smallNumberType)
    })

    it('should have the correct value', () => {
      expect(result.readInt16LE(1)).toBe(2000)
    })
  })

  describe('when a small negative number is provided', () => {
    beforeEach(() => {
      result = encodeValue(Buffer.alloc(0), -2000)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(smallNumberType)
    })

    it('should have the correct value', () => {
      expect(result.readInt16LE(1)).toBe(-2000)
    })
  })

  describe('when a float number is provided', () => {
    beforeEach(() => {
      result = encodeValue(Buffer.alloc(0), 10.5)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(floatType)
    })

    it('should have the correct value', () => {
      expect(result.readFloatLE(1)).toBe(10.5)
    })
  })

  describe('when a double number is provided', () => {
    beforeEach(() => {
      result = encodeValue(Buffer.alloc(0), 50024.4)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(doubleType)
    })

    it('should have the correct value', () => {
      expect(result.readDoubleLE(1)).toBe(50024.4)
    })
  })

  describe('when a large number is provided', () => {
    beforeEach(() => {
      result = encodeValue(Buffer.alloc(0), 2147483647)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(numberType)
    })

    it('should have the correct value', () => {
      expect(result.readInt32LE(1)).toBe(2147483647)
    })
  })

  describe('when a long is provided', () => {
    beforeEach(() => {
      result = encodeValue(Buffer.alloc(0), Number.MAX_SAFE_INTEGER)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(largeNumberType)
    })

    it('should have the correct value', () => {
      expect(result.readBigUInt64LE(1)).toBe(BigInt(Number.MAX_SAFE_INTEGER))
    })
  })

  describe('when array is encoded', () => {
    describe('and values are numbers', () => {
      beforeEach(() => {
        result = encodeValue(Buffer.alloc(0), [5, 8, 2])
      })

      it('should have the correct type', () => {
        expect(result[0]).toBe(smallArrayType)
      })

      it('should have the correct array length', () => {
        expect(result[1]).toBe(3)
      })

      it('should have the correct first value type', () => {
        expect(result[2]).toBe(nanoNumberType)
      })

      it('should have the correct first value', () => {
        expect(result[3]).toBe(5)
      })

      it('should have the correct second value type', () => {
        expect(result[4]).toBe(nanoNumberType)
      })

      it('should have the correct second value', () => {
        expect(result[5]).toBe(8)
      })

      it('should have the correct third value type', () => {
        expect(result[6]).toBe(nanoNumberType)
      })

      it('should have the correct third value', () => {
        expect(result[7]).toBe(2)
      })
    })

    describe('and values are booleans', () => {
      beforeEach(() => {
        result = encodeValue(Buffer.alloc(0), [true, true, false])
      })

      it('should have the correct type', () => {
        expect(result[0]).toBe(smallArrayType)
      })

      it('should have the correct array length', () => {
        expect(result[1]).toBe(3)
      })

      it('should have the correct first value type', () => {
        expect(result[2]).toBe(booleanType)
      })

      it('should have the correct first value', () => {
        expect(result[3]).toBe(1)
      })

      it('should have the correct second value type', () => {
        expect(result[4]).toBe(booleanType)
      })

      it('should have the correct second value', () => {
        expect(result[5]).toBe(1)
      })

      it('should have the correct third value type', () => {
        expect(result[6]).toBe(booleanType)
      })

      it('should have the correct third value', () => {
        expect(result[7]).toBe(0)
      })
    })

    describe('and values are strings', () => {
      beforeEach(() => {
        result = encodeValue(Buffer.alloc(0), ['foo', 'bar', 'baz'])
      })

      it('should have the correct type', () => {
        expect(result[0]).toBe(smallArrayType)
      })

      it('should have the correct array length', () => {
        expect(result[1]).toBe(3)
      })

      it('should have the correct first value type', () => {
        expect(result[2]).toBe(smallStringType)
      })

      it('should have the correct first value', () => {
        expect(result.toString('utf8', 4, 7)).toBe('foo')
      })

      it('should have the correct second value type', () => {
        expect(result[7]).toBe(smallStringType)
      })

      it('should have the correct second value', () => {
        expect(result.toString('utf8', 9, 12)).toBe('bar')
      })

      it('should have the correct third value type', () => {
        expect(result[12]).toBe(smallStringType)
      })

      it('should have the correct third value', () => {
        expect(result.toString('utf8', 14, 17)).toBe('baz')
      })
    })

    describe('and values are arrays', () => {
      beforeEach(() => {
        result = encodeValue(Buffer.alloc(0), [[5], [8], [2]])
      })

      it('should have the correct type', () => {
        expect(result[0]).toBe(smallArrayType)
      })

      it('should have the correct array length', () => {
        expect(result[1]).toBe(3)
      })

      it('should have the correct first value type', () => {
        expect(result[2]).toBe(smallArrayType)
      })

      it('should have the correct first value', () => {
        expect(result[5]).toBe(5)
      })

      it('should have the correct second value type', () => {
        expect(result[6]).toBe(smallArrayType)
      })

      it('should have the correct second value', () => {
        expect(result[9]).toBe(8)
      })

      it('should have the correct third value type', () => {
        expect(result[10]).toBe(smallArrayType)
      })

      it('should have the correct third value', () => {
        expect(result[13]).toBe(2)
      })
    })

    describe('and values are mixed', () => {
      beforeEach(() => {
        result = encodeValue(Buffer.alloc(0), [5, true, 'foo'])
      })

      it('should have the correct type', () => {
        expect(result[0]).toBe(smallArrayType)
      })

      it('should have the correct array length', () => {
        expect(result[1]).toBe(3)
      })

      it('should have the correct first value type', () => {
        expect(result[2]).toBe(nanoNumberType)
      })

      it('should have the correct first value', () => {
        expect(result[3]).toBe(5)
      })

      it('should have the correct second value type', () => {
        expect(result[4]).toBe(booleanType)
      })

      it('should have the correct second value', () => {
        expect(result[5]).toBe(1)
      })

      it('should have the correct third value type', () => {
        expect(result[6]).toBe(smallStringType)
      })

      it('should have the correct third value', () => {
        expect(result.toString('utf8', 8)).toBe('foo')
      })
    })
  })

  describe('when an object is provided', () => {
    beforeEach(() => {
      result = encodeValue(Buffer.alloc(0), { foo: 5, bar: 'foo' })
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(smallObjectType)
    })

    it('should have the correct length', () => {
      expect(result[1]).toBe(2)
    })

    it('should have the correct first key', () => {
      expect(result.toString('utf8', 4, 7)).toBe('foo')
    })

    it('should have the correct first value', () => {
      expect(result[8]).toBe(5)
    })

    it('should have the correct second key', () => {
      expect(result.toString('utf8', 11, 14)).toBe('bar')
    })

    it('should have the correct second value', () => {
      expect(result.toString('utf8', 16)).toBe('foo')
    })
  })

  describe('when key value is provided', () => {
    describe('and value is string', () => {
      beforeEach(() => {
        result = encodeKeyValuePair(Buffer.alloc(0), 'foo', 'bar')
      })

      it('should have the correct type for object', () => {
        expect(result[0]).toBe(objectKey)
      })

      it('should have the correct property key', () => {
        expect(result.toString('utf8', 2, 5)).toBe('foo')
      })

      it('should have the correct value type', () => {
        expect(result[5]).toBe(smallStringType)
      })

      it('should have the correct value', () => {
        expect(result.toString('utf8', 7)).toBe('bar')
      })
    })

    describe('and value is boolean', () => {
      beforeEach(() => {
        result = encodeKeyValuePair(Buffer.alloc(0), 'foo', true)
      })

      it('should have the correct type for object', () => {
        expect(result[0]).toBe(objectKey)
      })

      it('should have the correct property key', () => {
        expect(result.toString('utf8', 2, 5)).toBe('foo')
      })

      it('should have the correct value type', () => {
        expect(result[5]).toBe(booleanType)
      })

      it('should have the correct value', () => {
        expect(result[6]).toBe(1)
      })
    })

    describe('and value is number', () => {
      beforeEach(() => {
        result = encodeKeyValuePair(Buffer.alloc(0), 'foo', 6)
      })

      it('should have the correct type for object', () => {
        expect(result[0]).toBe(objectKey)
      })

      it('should have the correct property key', () => {
        expect(result.toString('utf8', 2, 5)).toBe('foo')
      })

      it('should have the correct value type', () => {
        expect(result[5]).toBe(nanoNumberType)
      })

      it('should have the correct value', () => {
        expect(result[6]).toBe(6)
      })
    })

    describe('and value is an array', () => {
      beforeEach(() => {
        result = encodeKeyValuePair(Buffer.alloc(0), 'foo', [6])
      })

      it('should have the correct type for object', () => {
        expect(result[0]).toBe(objectKey)
      })

      it('should have the correct property key', () => {
        expect(result.toString('utf8', 2, 5)).toBe('foo')
      })

      it('should have the correct value type', () => {
        expect(result[5]).toBe(smallArrayType)
      })

      it('should have the correct value', () => {
        expect(result[8]).toBe(6)
      })
    })

    describe('and value is an date', () => {
      let d: Date

      beforeEach(() => {
        d = new Date()
        result = encodeKeyValuePair(Buffer.alloc(0), 'foo', d)
      })

      it('should have the correct type for object', () => {
        expect(result[0]).toBe(objectKey)
      })

      it('should have the correct property key', () => {
        expect(result.toString('utf8', 2, 5)).toBe('foo')
      })

      it('should have the correct value type', () => {
        expect(result[5]).toBe(dateType)
      })

      it('should have the correct value', () => {
        expect(result.readBigUInt64LE(6)).toBe(BigInt(d.getTime()))
      })
    })

    describe('and value is function', () => {
      let thrown: boolean

      beforeEach(() => {
        try {
          result = encodeKeyValuePair(Buffer.alloc(0), 'foo', () => {})
          thrown = false
        } catch (err) {
          thrown = true
        }
      })

      it('should throw', () => {
        expect(thrown).toBe(true)
      })
    })
  })

  describe('when a date is provided', () => {
    let d: Date

    beforeEach(() => {
      d = new Date()
      result = encodeValue(Buffer.alloc(0), d)
    })

    it('should have the correct type', () => {
      expect(result[0]).toBe(dateType)
    })

    it('should have the correct value', () => {
      expect(result.readBigUInt64LE(1)).toBe(BigInt(d.getTime()))
    })
  })
})

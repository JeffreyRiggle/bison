import {
  encodeValue,
  encodeKeyValuePair,
} from '../encodeUtils'

import {
  decodeType,
  decodeBoolean,
  decodeNumber,
  decodeNanoNumber,
  decodeSmallNumber,
  decodeFloat,
  decodeDouble,
  decodeSmallString,
  decodeString,
  decodeLargeString,
  decodeKeyValuePair,
  decodeSmallArray,
  decodeArray,
  decodeLargeArray,
  decodeDate,
  decodeUndefined,
  decodeNull
} from '../decodeUtils'

import {
  undefinedType,
  smallStringType,
  stringType,
  largeStringType,
  booleanType,
  numberType,
  smallArrayType,
  arrayType,
  largeArrayType,
  nanoNumberType,
  smallNumberType,
  floatType,
  doubleType,
  dateType,
  nullType
} from '../constants'

describe('decode', () => {
  let buff: Buffer
  let result: any

  describe('when decoding an undefined', () => {
    beforeEach(() => {
      buff = encodeValue(Buffer.alloc(0), undefined)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(undefinedType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeUndefined(buff, 0)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(undefined)
      })
    })
  })

  describe('when decoding a null', () => {
    beforeEach(() => {
      buff = encodeValue(Buffer.alloc(0), null)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(nullType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeNull(buff, 0)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(null)
      })
    })
  })

  describe('when decoding a boolean', () => {
    beforeEach(() => {
      buff = encodeValue(Buffer.alloc(0), true)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(booleanType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeBoolean(buff, 1)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(true)
      })
    })
  })

  describe('when decoding a nano number', () => {
    beforeEach(() => {
      buff = encodeValue(Buffer.alloc(0), 6)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(nanoNumberType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeNanoNumber(buff, 1)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(6)
      })
    })
  })

  describe('when decoding a small number', () => {
    beforeEach(() => {
      buff = encodeValue(Buffer.alloc(0), 230)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(smallNumberType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeSmallNumber(buff, 1)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(230)
      })
    })
  })

  describe('when decoding a number', () => {
    beforeEach(() => {
      buff = encodeValue(Buffer.alloc(0), 50689)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(numberType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeNumber(buff, 1)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(50689)
      })
    })
  })

  describe('when decoding a float', () => {
    beforeEach(() => {
      buff = encodeValue(Buffer.alloc(0), 10.5)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(floatType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeFloat(buff, 1)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(10.5)
      })
    })
  })

  describe('when decoding a double', () => {
    beforeEach(() => {
      buff = encodeValue(Buffer.alloc(0), 50024.4)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(doubleType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeDouble(buff, 1)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(50024.4)
      })
    })
  })

  describe('when decoding a date', () => {
    let d: Date

    beforeEach(() => {
      d = new Date()
      buff = encodeValue(Buffer.alloc(0), d)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(dateType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeDate(buff, 1)
      })

      it('should have the correct value', () => {
        expect(result.value.getTime()).toBe(d.getTime())
      })
    })
  })

  // TODO string and large string
  describe('when decoding a small string', () => {
    beforeEach(() => {
      buff = encodeValue(Buffer.alloc(0), 'foo')
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(smallStringType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeSmallString(buff, 1)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe('foo')
      })
    })
  })

  describe('when decoding a string', () => {
    let str: string

    beforeEach(() => {
      str = ''
      for (let iter = 0; iter < 130; iter++) {
        str += iter
      }

      buff = encodeValue(Buffer.alloc(0), str)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(stringType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeString(buff, 1)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(str)
      })
    })
  })

  describe('when decoding a large string', () => {
    let str: string

    beforeEach(() => {
      str = ''
      for (let iter = 0; iter < 10000; iter++) {
        str += iter
      }

      buff = encodeValue(Buffer.alloc(0), str)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(largeStringType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeLargeString(buff, 1)
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(str)
      })
    })
  })

  describe('when decoding a small array', () => {
    beforeEach(() => {
      buff = encodeValue(Buffer.alloc(0), [5, true, 'foo'])
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(smallArrayType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeSmallArray(buff, 1)
      })

      it('should have the correct length', () => {
        expect(result.value.length).toBe(3)
      })

      it('should have the correct first value', () => {
        expect(result.value[0]).toBe(5)
      })

      it('should have the correct second value', () => {
        expect(result.value[1]).toBe(true)
      })

      it('should have the correct third value', () => {
        expect(result.value[2]).toBe('foo')
      })
    })
  })

  describe('when decoding an array', () => {
    let arr: any[]

    beforeEach(() => {
      arr = []

      for (let i = 0; i < 130; i++) {
        arr.push(i)
      }
      buff = encodeValue(Buffer.alloc(0), arr)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(arrayType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeArray(buff, 1)
      })

      it('should have the correct length', () => {
        expect(result.value.length).toBe(130)
      })
    })
  })

  describe('when decoding a large array', () => {
    let arr: any[]

    beforeEach(() => {
      arr = []

      for (let i = 0; i < 40000; i++) {
        arr.push(i)
      }
      buff = encodeValue(Buffer.alloc(0), arr)
    })

    describe('when decoding the type', () => {
      beforeEach(() => {
        result = decodeType(buff, 0)
      })

      it('should have the correct type', () => {
        expect(result.value).toBe(largeArrayType)
      })
    })

    describe('when decoding the value', () => {
      beforeEach(() => {
        result = decodeLargeArray(buff, 1)
      })

      it('should have the correct length', () => {
        expect(result.value.length).toBe(40000)
      })
    })
  })

  describe('decode key value pair', () => {
    describe('when value is boolean', () => {
      beforeEach(() => {
        buff = encodeKeyValuePair(Buffer.alloc(0), 'foo', true)
        result = decodeKeyValuePair(buff, 1)
      })

      it('should have the correct key', () => {
        expect(result.key).toBe('foo')
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(true)
      })
    })

    describe('when value is number', () => {
      beforeEach(() => {
        buff = encodeKeyValuePair(Buffer.alloc(0), 'foo', 6)
        result = decodeKeyValuePair(buff, 1)
      })

      it('should have the correct key', () => {
        expect(result.key).toBe('foo')
      })

      it('should have the correct value', () => {
        expect(result.value).toBe(6)
      })
    })

    describe('when value is string', () => {
      beforeEach(() => {
        buff = encodeKeyValuePair(Buffer.alloc(0), 'foo', 'bar')
        result = decodeKeyValuePair(buff, 1)
      })

      it('should have the correct key', () => {
        expect(result.key).toBe('foo')
      })

      it('should have the correct value', () => {
        expect(result.value).toBe('bar')
      })
    })

    describe('when value is array', () => {
      beforeEach(() => {
        buff = encodeKeyValuePair(Buffer.alloc(0), 'foo', [3])
        result = decodeKeyValuePair(buff, 1)
      })

      it('should have the correct key', () => {
        expect(result.key).toBe('foo')
      })

      it('should have the correct value length', () => {
        expect(result.value.length).toBe(1)
      })

      it('should have the correct value fist item', () => {
        expect(result.value[0]).toBe(3)
      })
    })
  })
})

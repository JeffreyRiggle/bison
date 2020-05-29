import {
  smallStringType,
  stringType,
  largeStringType,
  booleanType,
  numberType,
  objectKey,
  smallArrayType,
  arrayType,
  largeArrayType,
  smallObjectType,
  largeObjectType,
  nanoNumberType,
  smallNumberType,
  floatType,
  doubleType,
  dateType,
  undefinedType,
  nullType
} from './constants'

interface Sizable {
  length: number;
}

const handleLength = (obj: Sizable, small: number, medium: number, large: number): Buffer => {
  const len = obj.length

  if (len < 127) {
    const buff = Buffer.alloc(2)
    buff.writeInt8(small, 0)
    buff.writeInt8(len, 1)

    return buff
  }

  if (len < 32768) {
    const buff = Buffer.alloc(3)
    buff.writeInt8(medium, 0)
    buff.writeInt16LE(len, 1)

    return buff
  }

  const buff = Buffer.alloc(5)
  buff.writeInt8(large, 0)
  buff.writeInt32LE(len, 1)

  return buff
}

const encodeString = (stream: Buffer, str: string): Buffer => {
  const buff = Buffer.alloc(str.length)
  buff.write(str)
  const buffWithSize = Buffer.concat([handleLength(str, smallStringType, stringType, largeStringType), buff])

  return Buffer.concat([stream, buffWithSize])
}

const encodeBoolean = (stream: Buffer, boolean: boolean): Buffer => {
  const buff = Buffer.alloc(2)
  buff.writeInt8(booleanType)
  buff.writeInt8(boolean ? 1 : 0, 1)

  return Buffer.concat([stream, buff])
}

const encodeUndefined = (stream: Buffer): Buffer => {
  const buff = Buffer.alloc(1)
  buff.writeInt8(undefinedType)

  return Buffer.concat([stream, buff])
}

const encodeNull = (stream: Buffer): Buffer => {
  const buff = Buffer.alloc(1)
  buff.writeInt8(nullType)

  return Buffer.concat([stream, buff])
}

const encodeNanoNumber = (stream: Buffer, num: number): Buffer => {
  const buff = Buffer.alloc(2)
  buff.writeInt8(nanoNumberType)
  buff.writeInt8(num, 1)

  return Buffer.concat([stream, buff])
}

const encodeFloat = (stream: Buffer, num: number): Buffer => {
  const buff = Buffer.alloc(5)
  buff.writeInt8(floatType)
  buff.writeFloatLE(num, 1)

  return Buffer.concat([stream, buff])
}

const encodeSmallNumber = (stream: Buffer, num: number): Buffer => {
  const buff = Buffer.alloc(3)
  buff.writeInt8(smallNumberType)
  buff.writeInt16LE(num, 1)

  return Buffer.concat([stream, buff])
}

const encodeDouble = (stream: Buffer, num: number): Buffer => {
  const buff = Buffer.alloc(9)
  buff.writeInt8(doubleType)
  buff.writeDoubleLE(num, 1)

  return Buffer.concat([stream, buff])
}

const encodeLargeNumber = (stream: Buffer, num: number): Buffer => {
  const buff = Buffer.alloc(5)
  buff.writeInt8(numberType)
  buff.writeInt32LE(num, 1)

  return Buffer.concat([stream, buff])
}

const encodeNumber = (stream: Buffer, num: number): Buffer => {
  const isDecimal = !Number.isInteger(num)

  if (num < 128) {
    return isDecimal ? encodeFloat(stream, num) : encodeNanoNumber(stream, num)
  }

  if (num < 32768) {
    return isDecimal ? encodeFloat(stream, num) : encodeSmallNumber(stream, num)
  }

  return isDecimal ? encodeDouble(stream, num) : encodeLargeNumber(stream, num)
}

const encodeArray = (stream: Buffer, value: any[]): Buffer => {
  const rootBuff = handleLength(value, smallArrayType, arrayType, largeArrayType)
  const buffs: Buffer[] = []

  value.forEach(arrValue => {
    buffs.push(encodeValue(Buffer.alloc(0), arrValue))
  })

  return Buffer.concat([stream, rootBuff, ...buffs])
}

const encodeObject = (stream: Buffer, value: any): Buffer => {
  const keys = Object.keys(value)
  const buff = handleLength(keys, smallObjectType, objectKey, largeObjectType)
  const buffs: Buffer[] = []

  keys.forEach(key => {
    buffs.push(encodeKeyValuePair(Buffer.alloc(0), key, value[key]))
  })

  return Buffer.concat([stream, buff, ...buffs])
}

const encodeValue = (stream: Buffer, value: any): Buffer => {
  if (value === undefined) {
    return encodeUndefined(stream)
  }

  if (value === null) {
    return encodeNull(stream)
  }

  if (typeof value === 'boolean') {
    return encodeBoolean(stream, value)
  }

  if (typeof value === 'string') {
    return encodeString(stream, value)
  }

  if (typeof value === 'number') {
    return encodeNumber(stream, value)
  }

  if (Array.isArray(value)) {
    return encodeArray(stream, value)
  }

  if (value instanceof Date) {
    return encodeDate(stream, value)
  }

  if (typeof value === 'object') {
    return encodeObject(stream, value)
  }

  throw new Error(`Unkown type for ${typeof value}`)
}

const encodeKeyValuePair = (stream: Buffer, key: string, value: any): Buffer => {
  const buff = Buffer.alloc(key.length + 2)
  buff.writeInt8(objectKey)
  buff.writeInt8(key.length, 1)
  buff.write(key, 2)

  return Buffer.concat([stream, encodeValue(buff, value)])
}

const encodeDate = (stream: Buffer, date: Date): Buffer => {
  const buff = Buffer.alloc(9)
  buff.writeInt8(dateType)
  buff.writeBigUInt64LE(BigInt(date.getTime()), 1)

  return Buffer.concat([stream, buff])
}

export {
  encodeKeyValuePair,
  encodeValue
}

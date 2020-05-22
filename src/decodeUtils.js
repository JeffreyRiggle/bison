const {
  smallStringType,
  stringType,
  largeStringType,
  booleanType,
  numberType,
  smallArrayType,
  arrayType,
  largeArrayType,
  smallObjectType,
  objectType,
  largeObjectType,
  nanoNumberType,
  smallNumberType,
  floatType,
  doubleType,
  dateType
} = require('./constants')

const decodeType = (stream, offset) => {
  return {
    value: stream.readInt8(offset),
    offset: offset + 1
  }
}

const decodePropertyString = (stream, offset) => {
  const stringLen = stream.readInt8(offset)

  return {
    value: stream.toString('utf8', offset + 1, offset + stringLen + 1),
    offset: offset + stringLen + 1
  }
}

const decodeSmallString = (stream, offset) => {
  const stringLen = stream.readInt8(offset)

  return {
    value: stream.toString('utf8', offset + 1, offset + stringLen + 1),
    offset: offset + stringLen + 1
  }
}

const decodeString = (stream, offset) => {
  const stringLen = stream.readInt16LE(offset)

  return {
    value: stream.toString('utf8', offset + 2, offset + stringLen + 2),
    offset: offset + stringLen + 2
  }
}

const decodeLargeString = (stream, offset) => {
  const stringLen = stream.readInt32LE(offset)

  return {
    value: stream.toString('utf8', offset + 4, offset + stringLen + 4),
    offset: offset + stringLen + 4
  }
}

const decodeBoolean = (stream, offset) => {
  return {
    value: stream.readInt8(offset) === 1,
    offset: offset + 1
  }
}

const decodeNanoNumber = (stream, offset) => {
  return {
    value: stream.readInt8(offset),
    offset: offset + 1
  }
}

const decodeSmallNumber = (stream, offset) => {
  return {
    value: stream.readInt16LE(offset),
    offset: offset + 2
  }
}

const decodeNumber = (stream, offset) => {
  return {
    value: stream.readInt32LE(offset),
    offset: offset + 4
  }
}

const decodeFloat = (stream, offset) => {
  return {
    value: stream.readFloatLE(offset),
    offset: offset + 4
  }
}

const decodeDouble = (stream, offset) => {
  return {
    value: stream.readDoubleLE(offset),
    offset: offset + 8
  }
}

const decodeSmallArray = (stream, offset) => {
  const len = stream.readInt8(offset)
  return decodeArrayImpl(stream, offset + 1, len)
}

const decodeArray = (stream, offset) => {
  const len = stream.readInt16LE(offset)
  return decodeArrayImpl(stream, offset + 2, len)
}

const decodeLargeArray = (stream, offset) => {
  const len = stream.readInt32LE(offset)
  return decodeArrayImpl(stream, offset + 4, len)
}

const decodeArrayImpl = (stream, offset, len) => {
  let curr = offset
  let iter = 0
  const retVal = []

  while (iter < len) {
    const typeResult = decodeType(stream, curr)
    const result = decodeValue(stream, typeResult.value, typeResult.offset)
    retVal.push(result.value)
    curr = result.offset
    iter++
  }

  return {
    value: retVal,
    offset: curr
  }
}

const decodeSmallObject = (stream, offset) => {
  const len = stream.readInt8(offset)
  return decodeObjectImpl(stream, offset + 1, len)
}

const decodeObject = (stream, offset) => {
  const len = stream.readInt16LE(offset)
  return decodeObjectImpl(stream, offset + 2, len)
}

const decodeLargeObject = (stream, offset) => {
  const len = stream.readInt32LE(offset)
  return decodeObjectImpl(stream, offset + 4, len)
}

const decodeObjectImpl = (stream, offset, len) => {
  let curr = offset
  const retVal = {}
  let iter = 0

  while (iter < len) {
    const typeRes = decodeType(stream, curr)
    const res = decodeKeyValuePair(stream, typeRes.offset)
    curr = res.offset
    retVal[res.key] = res.value
    iter++
  }

  return {
    value: retVal,
    offset: curr
  }
}

const decodeDate = (stream, offset) => {
  return {
    value: new Date(Number(stream.readBigUInt64LE(offset))),
    offset: offset + 8
  }
}

const decodeValue = (stream, type, offset) => {
  if (type === booleanType) {
    return decodeBoolean(stream, offset)
  }

  if (type === smallStringType) {
    return decodeSmallString(stream, offset)
  }

  if (type === stringType) {
    return decodeString(stream, offset)
  }

  if (type === largeStringType) {
    return decodeLargeString(stream, offset)
  }

  if (type === numberType) {
    return decodeNumber(stream, offset)
  }

  if (type === nanoNumberType) {
    return decodeNanoNumber(stream, offset)
  }

  if (type === smallNumberType) {
    return decodeSmallNumber(stream, offset)
  }

  if (type === floatType) {
    return decodeFloat(stream, offset)
  }

  if (type === doubleType) {
    return decodeDouble(stream, offset)
  }

  if (type === smallArrayType) {
    return decodeSmallArray(stream, offset)
  }

  if (type === arrayType) {
    return decodeArray(stream, offset)
  }

  if (type === largeArrayType) {
    return decodeLargeArray(stream, offset)
  }

  if (type === smallObjectType) {
    return decodeSmallObject(stream, offset)
  }

  if (type === objectType) {
    return decodeObject(stream, offset)
  }

  if (type === largeObjectType) {
    return decodeLargeObject(stream, offset)
  }

  if (type === dateType) {
    return decodeDate(stream, offset)
  }

  throw new Error(`Unknown type ${type}`)
}

const decodeKeyValuePair = (stream, offset) => {
  const keyResult = decodePropertyString(stream, offset)
  const valueTypeResult = decodeType(stream, keyResult.offset)
  const valueResult = decodeValue(stream, valueTypeResult.value, valueTypeResult.offset)

  return {
    key: keyResult.value,
    value: valueResult.value,
    offset: valueResult.offset
  }
}

module.exports = {
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
  decodeSmallArray,
  decodeArray,
  decodeLargeArray,
  decodeSmallObject,
  decodeObject,
  decodeLargeObject,
  decodeKeyValuePair,
  decodeDate,
  decodeValue
}

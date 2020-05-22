const { encodeObject } = require('./encodeUtils')
const { decodeSmallObject, decodeObject, decodeLargeObject, decodeType } = require('./decodeUtils')
const { smallObjectType, objectType } = require('./constants')

module.exports.encode = (json) => {
  return encodeObject(Buffer.alloc(0), json)
}

module.exports.decode = (stream) => {
  const type = decodeType(stream, 0)

  if (type.value === smallObjectType) {
    return decodeSmallObject(stream, type.offset).value
  }

  if (type.value === objectType) {
    return decodeObject(stream, type.offset).value
  }

  return decodeLargeObject(stream, type.offset).value
}

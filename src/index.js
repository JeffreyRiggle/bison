const { encodeValue } = require('./encodeUtils')
const { decodeType, decodeValue } = require('./decodeUtils')

module.exports.encode = (json) => {
  return encodeValue(Buffer.alloc(0), json, 0)
}

module.exports.decode = (stream) => {
  const type = decodeType(stream, 0)

  return decodeValue(stream, type.value, type.offset).value
}

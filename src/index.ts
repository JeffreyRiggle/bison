const { encodeValue } =  require('./encodeUtils')
const { decodeType, decodeValue } = require('./decodeUtils')

export const encode = (json: any) => {
  return encodeValue(Buffer.alloc(0), json)
}

export const decode = (stream: Buffer) => {
  const type = decodeType(stream, 0)

  return decodeValue(stream, type.value, type.offset).value
}

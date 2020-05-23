import { encodeValue } from './encodeUtils'
import { decodeType, decodeValue } from './decodeUtils'

export const encode = (json: any): Buffer => {
  return encodeValue(Buffer.alloc(0), json)
}

export const decode = (stream: Buffer): any => {
  const type = decodeType(stream, 0)

  return decodeValue(stream, type.value, type.offset).value
}

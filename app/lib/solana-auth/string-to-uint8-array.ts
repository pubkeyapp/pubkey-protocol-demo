import { getUtf8Encoder, type ReadonlyUint8Array } from 'gill'

export function stringToReadonlyUint8Array(str: string): ReadonlyUint8Array {
  return getUtf8Encoder().encode(str)
}

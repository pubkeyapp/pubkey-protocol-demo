import { PublicKey } from '@solana/web3.js'

export function isValidSolanaPubKey(address: string) {
  try {
    return !!new PublicKey(address)
  } catch {
    return false
  }
}

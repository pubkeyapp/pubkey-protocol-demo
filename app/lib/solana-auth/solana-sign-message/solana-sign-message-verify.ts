import {
  assertIsAddress,
  assertIsSignature,
  getBase58Encoder,
  getPublicKeyFromAddress,
  type SignatureBytes,
  type SolanaClient,
  verifySignature,
} from 'gill'
import type { SolanaAuthMessageSigned } from '../solana-auth-message'
import { stringToReadonlyUint8Array } from '../string-to-uint8-array'

export async function solanaSignMessageVerify(client: SolanaClient, options: SolanaAuthMessageSigned) {
  assertIsSignature(options.signature)
  assertIsAddress(options.publicKey)

  const signature = options.signature
  const publicKey = options.publicKey

  const signatureBytes = getBase58Encoder().encode(signature)
  const cryptoKey = await getPublicKeyFromAddress(publicKey)

  const message = stringToReadonlyUint8Array(options.message.text)
  const verified = await verifySignature(cryptoKey, signatureBytes as SignatureBytes, message)

  if (!verified) {
    throw new Error('solanaSignMessageVerify: Invalid signature')
  }
  return publicKey
}

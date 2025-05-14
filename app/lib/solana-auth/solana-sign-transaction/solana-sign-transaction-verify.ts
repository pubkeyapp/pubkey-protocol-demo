import type { SolanaAuthMessageSigned } from '../solana-auth-message'
import {
  address,
  getBase58Encoder,
  getPublicKeyFromAddress,
  getTransactionDecoder,
  type SolanaClient,
  verifySignature,
} from 'gill'

export async function solanaSignTransactionVerify(client: SolanaClient, options: SolanaAuthMessageSigned) {
  const publicKey = address(options.publicKey)
  const base58Transaction = options.signature
  const transactionBytes = getBase58Encoder().encode(base58Transaction)
  const transaction = getTransactionDecoder().decode(transactionBytes)
  const signatureBytes = transaction.signatures[publicKey]
  if (!signatureBytes) {
    throw new Error(`Signature not found for ${publicKey}`)
  }

  const cryptoKey = await getPublicKeyFromAddress(publicKey)

  if (await verifySignature(cryptoKey, signatureBytes, transaction.messageBytes)) {
    return publicKey
  }
  throw new Error(`Invalid signature for ${publicKey}`)
}

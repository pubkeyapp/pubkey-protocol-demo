import type { SolanaAuthMessageSigned } from './solana-auth-message'
import { solanaSignMessage } from './solana-sign-message'
import { solanaSignTransaction } from './solana-sign-transaction'
import type { SolanaClient } from 'gill'

export async function solanaAuthMethodVerify(client: SolanaClient, options: SolanaAuthMessageSigned) {
  switch (options.method) {
    case 'solana:signMessage':
      return solanaSignMessage.verify(client, options)
    case 'solana:signTransaction':
      return solanaSignTransaction.verify(client, options)
    default:
      throw `Method not supported: ${options.method}`
  }
}

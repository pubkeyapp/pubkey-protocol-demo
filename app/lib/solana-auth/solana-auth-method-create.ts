import type { SolanaAuthMessageCreateOptions } from './solana-auth-message'
import { solanaSignMessage } from './solana-sign-message'
import { solanaSignTransaction } from './solana-sign-transaction'
import type { SolanaClient } from 'gill'

export function solanaAuthMethodCreate(client: SolanaClient, options: SolanaAuthMessageCreateOptions) {
  switch (options.method) {
    case 'solana:signMessage':
      return solanaSignMessage.create(client, options)
    case 'solana:signTransaction':
      return solanaSignTransaction.create(client, options)
    default:
      throw `Method not supported: ${options.method}`
  }
}

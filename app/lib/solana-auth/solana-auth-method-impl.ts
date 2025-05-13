import type { SolanaClient } from 'gill'
import type { SolanaAuthMessage, SolanaAuthMessageCreateOptions, SolanaAuthMessageSigned } from './solana-auth-message'
import type { SolanaAuthMethod } from './solana-auth-methods'

export interface SolanaAuthMethodImpl {
  method: SolanaAuthMethod
  create: (client: SolanaClient, options: SolanaAuthMessageCreateOptions) => Promise<SolanaAuthMessage>
  verify: (client: SolanaClient, options: SolanaAuthMessageSigned) => Promise<string>
}

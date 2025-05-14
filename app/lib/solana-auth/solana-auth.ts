import { createSolanaClient } from 'gill'
import { createSolanaAuth } from './create-solana-auth'

const client = createSolanaClient({
  urlOrMoniker: 'https://api.devnet.solana.com',
})

export const solanaAuth = createSolanaAuth({
  client,
  methods: ['solana:signMessage', 'solana:signTransaction'],
})

if (!solanaAuth) {
  throw new Error('Solana Auth not initialized')
}

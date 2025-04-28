import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { getSolanaContext } from './get-solana-context'
import { airdropAccounts } from './airdrop-accounts'

export async function ensureFeePayerBalance(minSolAmount = 1) {
  const minLamports = minSolAmount * LAMPORTS_PER_SOL
  const { connection, feePayerAuthority, feePayerCommunity } = getSolanaContext()
  const balanceAuthority = await connection.getBalance(feePayerAuthority.publicKey)
  const balanceCommunity = await connection.getBalance(feePayerCommunity.publicKey)
  if (balanceAuthority < minLamports || balanceCommunity < minLamports) {
    await airdropAccounts(connection, [
      { label: 'Fee Payer Authority', publicKey: feePayerAuthority.publicKey },
      { label: 'Fee Payer Community', publicKey: feePayerCommunity.publicKey },
    ])
  }
}

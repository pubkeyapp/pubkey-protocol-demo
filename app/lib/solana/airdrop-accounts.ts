import { type Connection, LAMPORTS_PER_SOL } from '@solana/web3.js'
import * as anchor from '@coral-xyz/anchor'

export async function airdropAccounts(
  connection: Connection,
  accounts: { label: string; publicKey: anchor.web3.PublicKey }[],
): Promise<void> {
  const airdroppedAccounts = await Promise.all(
    accounts.map(async ({ label, publicKey }) => {
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed')
      const signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL)

      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      })

      return label
    }),
  )

  console.log(`All accounts airdropped: ${airdroppedAccounts.join(', ')}`)
}

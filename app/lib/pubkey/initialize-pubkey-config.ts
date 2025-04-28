import { getSolanaContext } from '~/lib/solana/get-solana-context'
import { ensureFeePayerBalance } from '~/lib/solana/ensure-fee-payer-balance'
import type { Connection, TransactionConfirmationStatus } from '@solana/web3.js'
import { sleep } from '~/lib/sleep'
import { getPubkeySdkAuthority } from '~/lib/pubkey/get-pubkey-sdk-authority'

export async function initializePubkeyConfig(): Promise<string> {
  const { connection, feePayerAuthority: feePayer } = getSolanaContext()
  const sdk = getPubkeySdkAuthority()
  const { config, tx: transaction } = await sdk.configInit({
    authority: feePayer.publicKey,
    communityAuthority: feePayer.publicKey,
  })

  if (!config || !transaction) {
    throw new Error(`Initializing PubKey Protocol Failed!`)
  }
  await ensureFeePayerBalance()

  transaction.sign([feePayer])

  const signature = await connection.sendRawTransaction(transaction.serialize(), { skipPreflight: true })
  console.log(`Initialize signature`, signature)

  await runSignatureRequestUntilConfirmed({ connection, signature })

  return signature
}

async function runSignatureRequestUntilConfirmed({
  connection,
  signature,
}: {
  connection: Connection
  signature: string
}) {
  let count = 0
  let parsed: TransactionConfirmationStatus | undefined = undefined

  // Loop that runs as long as parsed isn't confirmed yet.
  while (parsed !== 'confirmed') {
    const result = await connection.getSignatureStatus(signature)
    parsed = result.value?.confirmationStatus
    count++
    console.log(`Status: ${result.value?.confirmationStatus}. Retry ${count} in 1 second...`)
    await sleep(1)
  }

  return true
}

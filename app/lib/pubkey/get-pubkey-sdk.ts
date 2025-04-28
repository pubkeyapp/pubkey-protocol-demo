import { getSolanaContext } from '../solana/get-solana-context'
import {
  AnchorKeypairWallet,
  PUBKEY_PROTOCOL_PROGRAM_ID,
  type PubKeyProfileSdkOptions,
  PubKeyProtocolSdk,
} from '@pubkey-protocol/sdk'
import { AnchorProvider } from '@coral-xyz/anchor'

export function getPubkeySdk({ feePayer }: { feePayer: 'authority' | 'community' }) {
  const { connection, feePayerAuthority, feePayerCommunity } = getSolanaContext()
  const provider = new AnchorProvider(
    connection,
    new AnchorKeypairWallet(feePayer === 'authority' ? feePayerAuthority : feePayerCommunity),
    {
      commitment: connection.commitment,
      skipPreflight: true,
    },
  )
  const options: PubKeyProfileSdkOptions = {
    connection,
    programId: PUBKEY_PROTOCOL_PROGRAM_ID,
    provider,
  }
  return new PubKeyProtocolSdk(options)
}

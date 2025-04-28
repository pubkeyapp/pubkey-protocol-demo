import { Connection, Keypair } from '@solana/web3.js'

const secretFeePayerAuthority = process.env['SOLANA_FEE_PAYER_AUTHORITY']
const secretFeePayerCommunity = process.env['SOLANA_FEE_PAYER_COMMUNITY']
const rpcEndpoint = process.env['SOLANA_RPC_ENDPOINT']

export interface SolanaContext {
  connection: Connection
  feePayerAuthority: Keypair
  feePayerCommunity: Keypair
}

export function getSolanaContext(): SolanaContext {
  if (!secretFeePayerAuthority) {
    throw new Error(`Env var SOLANA_FEE_PAYER_AUTHORITY not set.`)
  }
  if (!secretFeePayerCommunity) {
    throw new Error(`Env var SOLANA_FEE_PAYER_COMMUNITY not set.`)
  }
  if (!rpcEndpoint) {
    throw new Error(`Env var SOLANA_RPC_ENDPOINT not set.`)
  }
  const feePayerAuthority = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(secretFeePayerAuthority)))
  const feePayerCommunity = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(secretFeePayerCommunity)))
  console.log(`Fee payer Authority: ${feePayerAuthority.publicKey.toString()}`)
  console.log(`Fee payer Community: ${feePayerCommunity.publicKey.toString()}`)
  return {
    connection: new Connection(rpcEndpoint, 'confirmed'),
    feePayerAuthority,
    feePayerCommunity,
  }
}

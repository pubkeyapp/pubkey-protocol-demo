import type { SolanaAuthMessageSigned } from '~/lib/solana-auth/solana-auth-message'
import { solanaAuth } from '~/lib/solana-auth/solana-auth'

function parsePayload(payload: string = ''): SolanaAuthMessageSigned {
  try {
    return JSON.parse(payload)
  } catch {
    throw new Error(`Invalid payload`)
  }
}

export async function ensureVerifiedPayload(payload: string = '') {
  const parsed = parsePayload(payload)
  const result = await solanaAuth.verifyMessage(parsed)
  if (!result) {
    throw new Error('Invalid signature')
  }
  return result
}

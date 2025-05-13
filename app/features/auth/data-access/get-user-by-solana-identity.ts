import { isValidSolanaPubKey } from '~/lib/solana/is-valid-solana-pubkey'
import { IdentityProvider } from '@prisma/client'
import { getUserByIdentity } from '~/features/auth/data-access/get-user-by-identity'

export async function getUserBySolanaIdentity({ providerId }: { providerId: string }) {
  if (!isValidSolanaPubKey(providerId)) {
    throw new Error('Invalid Solana providerId')
  }
  return getUserByIdentity({ provider: IdentityProvider.Solana, providerId })
}

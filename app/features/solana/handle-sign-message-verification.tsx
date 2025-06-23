import type { User } from '~/lib/db.server'
import { SolanaVerificationType } from '~/features/solana/get-solana-verification-type'
import { userUpdateWithIdentity } from '~/lib/core/user-update-with-identity'
import { IdentityProvider } from '@prisma/client'
import { commitSessionAndRedirect } from '~/lib/auth/commit-session-and-redirect'
import { userCreateWithIdentity } from '~/lib/core/user-create-with-identity'
import { userEnsureVerifiedIdentity } from '~/lib/core/user-ensure-verified-identity'
import { ellipsify } from '@pubkey-protocol/sdk'
import { defaultIdentityAvatarUrl } from '~/lib/compute-user-avatar-url'

export async function handleSignMessageVerification({
  actor,
  owner,
  providerId,
  request,
  type,
}: {
  actor?: User | null
  owner?: User | null
  providerId: string
  request: Request
  type: SolanaVerificationType
}) {
  const name = ellipsify(providerId, 8)
  const profile = { username: name, avatarUrl: defaultIdentityAvatarUrl({ name, providerId }) }
  switch (type) {
    // Link the verified identity to the actor
    case SolanaVerificationType.Link:
      if (!actor) {
        throw new Error('SolanaVerificationType.Link: No actor found')
      }
      return await userUpdateWithIdentity(actor.id, {
        address: providerId,
        name,
        profile,
        provider: IdentityProvider.Solana,
        providerId,
      })
    // Login the owner of the verified identity
    case SolanaVerificationType.Login:
      if (!owner) {
        throw new Error('SolanaVerificationType.Login: No owner found')
      }
      return commitSessionAndRedirect({ request, user: owner })
    // Register a new user with the verified identity
    case SolanaVerificationType.Register:
      const user = await userCreateWithIdentity({
        address: providerId,
        name,
        profile,
        provider: IdentityProvider.Solana,
        providerId,
      })
      // Set the cookie for the new user
      return commitSessionAndRedirect({ request, user })
    // Return the actor that verified the identity
    case SolanaVerificationType.Verify:
      if (!actor) {
        throw new Error('SolanaVerificationType.Verify: No actor found')
      }
      // We don't need to do anything? 🤷‍♂️
      return await userEnsureVerifiedIdentity(actor.id, {
        address: providerId,
        name,
        profile,
        provider: IdentityProvider.Solana,
        providerId,
      })
    // Everything else should have been handled before
    default:
      throw new Error(`Unknown verification type ${type}`)
  }
}

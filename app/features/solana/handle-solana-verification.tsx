import { getSolanaVerificationType, SolanaVerificationType } from '~/features/solana/get-solana-verification-type'
import { getUser } from '~/features/auth/data-access/get-user'
import { getUserBySolanaIdentity } from '~/features/auth/data-access/get-user-by-solana-identity'
import { solanaAuth } from '~/lib/solana-auth/solana-auth'
import { ensureVerifiedPayload } from '~/features/solana/ensure-verified-payload'
import { handleSignMessageVerification } from '~/features/solana/handle-sign-message-verification'

export async function handleSolanaVerification({
  action,
  enabledTypes = [
    SolanaVerificationType.Login,
    SolanaVerificationType.Link,
    SolanaVerificationType.Register,
    SolanaVerificationType.Verify,
  ],
  request,
  payload,
  publicKey,
}: {
  action?: string
  enabledTypes?: SolanaVerificationType[]
  request: Request
  payload?: string
  publicKey: string
}) {
  const [actor, owner] = await Promise.all([getUser(request), getUserBySolanaIdentity({ providerId: publicKey })])

  // This determines the type of verification we are performing
  const verification = getSolanaVerificationType({
    actorId: actor?.id ?? undefined,
    ownerId: owner?.id ?? undefined,
    enabledTypes,
  })

  if (verification.type === SolanaVerificationType.Error) {
    throw new Error(verification.message)
  }

  switch (action) {
    case 'sign-message-create':
      return {
        success: true,
        message: await solanaAuth.createMessage({ method: 'solana:signMessage', publicKey }),
        type: 'solana-auth-message',
      }
    case 'sign-message-verify':
      await ensureVerifiedPayload(payload)
      const handled = await handleSignMessageVerification({
        actor,
        owner,
        providerId: publicKey,
        request,
        type: verification.type,
      })
      // If type is a Response, we should return it directly. Otherwise, wrap it in a result.
      return handled instanceof Response
        ? handled
        : {
            success: true,
            message: `User ${handled?.username} verified`,
            type: 'solana-auth-result',
          }
    default:
      return {
        success: false,
        message: `Unknown action ${action}`,
      }
  }
}

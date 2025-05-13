export enum SolanaVerificationType {
  Error = 'Error',
  Login = 'Login',
  Register = 'Register',
  Link = 'Link',
  Verify = 'Verify',
}

export function getSolanaVerificationType({
  actorId,
  ownerId,
  enabledTypes = [
    SolanaVerificationType.Login,
    SolanaVerificationType.Link,
    SolanaVerificationType.Register,
    SolanaVerificationType.Verify,
  ],
}: {
  actorId?: string
  ownerId?: string
  enabledTypes?: SolanaVerificationType[]
}): {
  message?: string
  type: SolanaVerificationType
} {
  function ensureEnabledType(type: SolanaVerificationType) {
    if (!enabledTypes.includes(type)) {
      throw new Error(`Solana verification type ${type} is not enabled`)
    }
    return type
  }

  // If the wallet isn't owned by any user
  if (!ownerId) {
    return actorId
      ? // If actor is set, we want to link the wallet
        { type: ensureEnabledType(SolanaVerificationType.Link) }
      : // Otherwise, we want to register a new user
        { type: ensureEnabledType(SolanaVerificationType.Register) }
  }

  // We are not logged in, so this is a login
  if (!actorId) {
    return { type: ensureEnabledType(SolanaVerificationType.Login) }
  }

  // We are logged in, make sure that the user owns the wallet
  if (ownerId !== actorId) {
    return { type: SolanaVerificationType.Error, message: 'User does not own public key' }
  }

  // Actor owns the wallet, we can now verify it
  return { type: ensureEnabledType(SolanaVerificationType.Verify) }
}

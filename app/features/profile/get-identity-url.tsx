import type { Identity } from '~/lib/generated/zod'
import { IdentityProvider } from '@prisma/client'
import { getExplorerUrl } from '@pubkey-protocol/sdk'

export function getIdentityUrl(identity: Identity) {
  switch (identity.provider) {
    case IdentityProvider.Discord:
      return `https://discord.com/users/${identity.providerId}`
    case IdentityProvider.Github:
      return `https://github.com/${identity.name}`
    case IdentityProvider.Google:
      return `https://mail.google.com/mail/?view=cm&to=${identity.address}`
    case IdentityProvider.Solana:
      return getExplorerUrl(`address/${identity.providerId}`, 'devnet')
    case IdentityProvider.Telegram:
      return `https://t.me/${identity.name}`
    case IdentityProvider.X:
      return `https://x.com/${identity.name}`
    default:
      return undefined
  }
}
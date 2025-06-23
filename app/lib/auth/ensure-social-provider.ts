import { IdentityProvider } from '@prisma/client'

export function ensureSocialProvider(provider: string) {
  if (!socialProviders.map((i) => i.toLowerCase()).includes(provider.toLowerCase())) {
    throw new Error(`Unknown provider "${provider}"`)
  }
}

export const socialProviders: IdentityProvider[] = [
  IdentityProvider.Github,
  IdentityProvider.Google,
  IdentityProvider.X,
]

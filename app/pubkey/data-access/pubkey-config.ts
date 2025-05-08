import { IdentityProvider } from '@pubkey-protocol/sdk'

export const providers: IdentityProvider[] = [
  IdentityProvider.Discord,
  IdentityProvider.Github,
  IdentityProvider.Google,
  IdentityProvider.X,
]

export interface PubkeyConfig {
  providers: IdentityProvider[]
}

export const pubkeyConfig: PubkeyConfig = {
  providers,
}

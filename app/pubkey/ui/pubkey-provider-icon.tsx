import { IdentityProvider } from '@pubkey-protocol/sdk'
import { UiIcon } from '~/ui/ui-icon'
import type { IconName } from '~/ui/icons/types'

export function PubkeyProviderIcon({ provider }: { provider: IdentityProvider }) {
  return <UiIcon name={getProviderIcon(provider)} />
}

function getProviderIcon(provider: IdentityProvider): IconName {
  switch (provider) {
    case IdentityProvider.Discord:
      return 'Discord'
    case IdentityProvider.Github:
      return 'Github'
    case IdentityProvider.Google:
      return 'Google'
    case IdentityProvider.X:
      return 'X'
  }
  throw new Error(`No icon for provider ${provider}`)
}

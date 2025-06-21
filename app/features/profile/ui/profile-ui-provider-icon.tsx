import { UiIcon, type UiIconProps } from '~/ui/ui-icon'
import type { IconName } from '~/ui/icons/types'
import { IdentityProvider } from '@prisma/client'

export function ProfileUiProviderIcon({
  provider,
  ...props
}: Omit<UiIconProps, 'name'> & {
  provider: IdentityProvider
}) {
  return <UiIcon {...props} name={getProviderIcon(provider)} />
}

function getProviderIcon(provider: IdentityProvider): IconName {
  switch (provider) {
    case IdentityProvider.Discord:
      return 'Discord'
    case IdentityProvider.Github:
      return 'Github'
    case IdentityProvider.Google:
      return 'Google'
    case IdentityProvider.Solana:
      return 'Solana'
    case IdentityProvider.X:
      return 'X'
  }
  throw new Error(`No icon for provider ${provider}`)
}

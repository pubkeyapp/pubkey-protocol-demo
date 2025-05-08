import { IdentityProvider } from '@pubkey-protocol/sdk'
import { NavLink, Text } from '@mantine/core'
import { PubkeyProviderIcon } from '~/pubkey/ui/pubkey-provider-icon'

export function OnboardingUiSocials({
  handleClick,
  providers,
}: {
  handleClick: (provider: IdentityProvider) => void
  providers: IdentityProvider[]
}) {
  return providers.map((provider) => (
    <div key={provider}>
      <NavLink
        p="md"
        variant="light"
        active
        label={<Text size="xl">Sign in with {provider}</Text>}
        leftSection={<PubkeyProviderIcon provider={provider} />}
        onClick={() => handleClick(provider)}
      />
    </div>
  ))
}

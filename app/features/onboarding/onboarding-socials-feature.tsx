import { useNavigate } from 'react-router'
import { OnboardingUiPage } from '~/features/onboarding/ui/onboarding-ui-page'
import { OnboardingUiSocials } from '~/features/onboarding/ui/onboarding-ui-socials'
import type { Route } from './+types/onboarding-socials-feature'
import { pubkeyConfig } from '~/pubkey/data-access/pubkey-config'

export async function loader() {
  return { providers: pubkeyConfig.providers }
}

export default function OnboardingSocialsFeature({ loaderData: { providers } }: Route.ComponentProps) {
  const navigate = useNavigate()

  return (
    <OnboardingUiPage
      nextLink="/onboarding/wallets"
      title="Sign in"
      description="Sign in using a Social identity, you can later add more."
    >
      <OnboardingUiSocials
        handleClick={() => {
          navigate('/onboarding/wallets')
        }}
        providers={providers}
      />
    </OnboardingUiPage>
  )
}

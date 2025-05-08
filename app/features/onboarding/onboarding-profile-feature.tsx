import { useNavigate } from 'react-router'
import { OnboardingUiPage } from './ui/onboarding-ui-page'
import { OnboardingUiProfile } from '~/features/onboarding/onboarding-ui-profile'
import { sleep } from '~/lib/sleep'

export default function OnboardingFeature() {
  const navigate = useNavigate()
  return (
    <OnboardingUiPage title="Create your profile" description="Your profile will be stored on Solana.">
      <OnboardingUiProfile
        submit={async (vals) => {
          console.log('Submit vals', vals)
          await sleep(1)
          navigate('/onboarding/done')
          return
        }}
      />
    </OnboardingUiPage>
  )
}

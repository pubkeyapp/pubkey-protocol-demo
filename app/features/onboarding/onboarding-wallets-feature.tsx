import { OnboardingUiPage } from './ui/onboarding-ui-page'
import { OnboardingUiWallets } from '~/features/onboarding/ui/onboarding-ui-wallets'
import { useWallet } from '@solana/wallet-adapter-react'

export default function OnboardingFeature() {
  const { connect, select, wallets } = useWallet()

  return (
    <OnboardingUiPage
      previousLink="/onboarding"
      nextLink="/onboarding/profile"
      title="Connect Solana wallet"
      description="Connect a Solana wallet, you can later add more."
    >
      <OnboardingUiWallets
        handleClick={async (w) => {
          select(w.name)
          await connect()
        }}
        wallets={wallets.map((w) => ({
          icon: w.adapter.icon,
          name: w.adapter.name,
        }))}
      />
    </OnboardingUiPage>
  )
}

import { Alert, Image, NavLink, Text } from '@mantine/core'
import type { WalletName } from '@solana/wallet-adapter-base'

export interface OnboardingWallet {
  icon: string
  name: WalletName
}

export function OnboardingUiWallets({
  handleClick,
  wallets = [],
}: {
  handleClick: (provider: OnboardingWallet) => Promise<void>
  wallets: OnboardingWallet[]
}) {
  if (!wallets.length) {
    return (
      <Alert color="yellow" title="No wallets detected.">
        Install a Solana Wallet extensions to continue.
      </Alert>
    )
  }
  return wallets.map((wallet) => {
    return (
      <div key={wallet.name}>
        <NavLink
          p="md"
          variant="light"
          active
          label={<Text size="xl">Connect {wallet.name}</Text>}
          leftSection={<Image src={wallet.icon} height={24} />}
          onClick={async () => {
            await handleClick(wallet)
          }}
        />
      </div>
    )
  })
}

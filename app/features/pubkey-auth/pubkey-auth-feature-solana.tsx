import { Container, Group, Text } from '@mantine/core'
import { LucideSoup } from 'lucide-react'
import type { Route } from './+types/pubkey-auth-feature-database'
import { appMeta } from '~/lib/app-meta'
import { UiPage } from '~/ui/ui-page'
import { useWallet } from '@solana/wallet-adapter-react'
import { ellipsify } from '@pubkey-protocol/sdk'
import { WalletDisconnectButton, WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { UiRenderClient } from '~/ui/ui-render-client'
import { getUserFromRequest } from '~/lib/core/get-user-from-request'

export function meta() {
  return appMeta('Pubkey Auth Solana')
}

export async function loader(props: Route.LoaderArgs) {
  const user = await getUserFromRequest(props.request)
}

export async function action(props: Route.ActionArgs) {}

export default function PubkeyAuthFeatureDatabase() {
  const wallet = useWallet()
  return (
    <UiPage title="Solana" icon={<LucideSoup />}>
      <UiRenderClient>
        <Container>
          {wallet?.publicKey ? (
            <Group align="center" justify="space-between">
              <Text>{ellipsify(wallet.publicKey?.toString())}</Text>
              <WalletDisconnectButton />
            </Group>
          ) : (
            <Group align="center" justify="space-between">
              <Text>Connect wallet to continue</Text>
              <WalletMultiButton />
            </Group>
          )}
        </Container>
      </UiRenderClient>
    </UiPage>
  )
}

import { Button, Container, Stack } from '@mantine/core'
import { appMeta } from '~/lib/app-meta'
import type { Route } from './+types/pubkey-feature-index'
import { UiInfo } from '~/ui/ui-alert'
import { PubkeyUiConfigCard } from '~/features/pubkey/ui/pubkey-ui-config-card'
import type { PubKeyConfig } from '@pubkey-protocol/sdk'
import { data, useFetcher } from 'react-router'
import { getPubkeyConfig } from '~/lib/pubkey/get-pubkey-config'
import { initializePubkeyConfig } from '~/lib/pubkey/initialize-pubkey-config'
import { ensureFeePayerBalance } from '~/lib/solana/ensure-fee-payer-balance'

export function meta() {
  return appMeta('Index')
}

export async function loader() {
  const config: PubKeyConfig | null = await getPubkeyConfig()

  await ensureFeePayerBalance()

  return { config }
}

export async function action(props: Route.ActionArgs) {
  const tx = await initializePubkeyConfig()

  return data({ tx })
}

export default function PubkeyFeatureIndex({ loaderData: { config } }: Route.ComponentProps) {
  const fetcher = useFetcher()

  return (
    <Container h="100%" style={{ overflow: 'auto' }} p="xs">
      {config ? (
        <PubkeyUiConfigCard config={config as PubKeyConfig} />
      ) : (
        <UiInfo
          message={
            <Stack fz="inherit">
              <Button
                loading={fetcher.state !== 'idle'}
                onClick={async () => {
                  const data = new FormData()
                  const res = await fetcher.submit(data, { method: 'post' })
                  console.log(`Res from action`, res, fetcher.data, fetcher)
                  await fetcher.load('.')
                }}
              >
                Initialize PubKey Protocol
              </Button>
            </Stack>
          }
          title="PubKey Protocol is not initialized on this cluster"
        />
      )}
    </Container>
  )
}

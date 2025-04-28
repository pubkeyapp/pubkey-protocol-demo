import { Container } from '@mantine/core'
import type { PubKeyConfig } from '@pubkey-protocol/sdk'
import { data, redirect, useFetcher } from 'react-router'
import type { Route } from './+types/pubkey-feature-community-create'
import { appMeta } from '~/lib/app-meta'
import { getPubkeyConfig } from '~/lib/pubkey/get-pubkey-config'
import { ensureFeePayerBalance } from '~/lib/solana/ensure-fee-payer-balance'
import { getSolanaContext } from '~/lib/solana/get-solana-context'
import { UiPage } from '~/ui/ui-page'
import { UiBackButton } from '~/ui/ui-back-button'
import { UiCard } from '~/ui/ui-card'
import { sleep } from '~/lib/sleep'
import { PubkeyUiCommunityCreateForm } from './ui/pubkey-ui-community-create-form'
import { getPubkeySdkAuthority } from '~/lib/pubkey/get-pubkey-sdk-authority'

export function meta() {
  return appMeta('Communities')
}

export async function loader() {
  const config: PubKeyConfig | null = await getPubkeyConfig()

  await ensureFeePayerBalance()

  return { config }
}

export async function action({ params, context, request }: Route.ActionArgs) {
  const { connection, feePayerAuthority, feePayerCommunity } = getSolanaContext()
  const formData = await request.formData()
  const name = formData.get('name')
  if (!name || typeof name !== 'string' || !name.length) {
    return data({ errors: { name: 'Unexpected name' } })
  }
  console.log(`Creating community with name!`, name, '...')
  const sdk = getPubkeySdkAuthority()
  const { input, tx: transaction } = await sdk.communityCreate({
    name,
    authority: feePayerCommunity.publicKey,
    communityAuthority: feePayerAuthority.publicKey,
  })

  transaction.sign([feePayerAuthority, feePayerCommunity])

  const signature = await connection.sendRawTransaction(transaction.serialize(), { skipPreflight: true })
  console.log(`Initialize signature`, signature)
  console.log(`Created community`, input.name, '. Sleeping for 3 seconds...')
  await sleep(3)
  return redirect(`/pubkey/communities/${input.slug}`)
}

export default function PubkeyFeatureCommunityCreate({ loaderData: { config } }: Route.ComponentProps) {
  const fetcher = useFetcher()
  return (
    <UiPage title="Create Community" icon={<UiBackButton />}>
      <Container h="100%" style={{ overflow: 'auto' }}>
        <UiCard>
          <fetcher.Form method="post">
            <PubkeyUiCommunityCreateForm loading={fetcher.state !== 'idle'} />
            {fetcher.data?.errors ? <pre>{JSON.stringify(fetcher.data.errors)}</pre> : null}
          </fetcher.Form>
        </UiCard>
      </Container>
    </UiPage>
  )
}

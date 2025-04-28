import { Container, Stack } from '@mantine/core'
import type { PubKeyCommunity } from '@pubkey-protocol/sdk'
import type { Route } from './+types/pubkey-feature-community-detail'
import { appMeta } from '~/lib/app-meta'
import { UiError } from '~/ui/ui-alert'
import { UiPage } from '~/ui/ui-page'
import { UiBackButton } from '~/ui/ui-back-button'
import { UiCard } from '~/ui/ui-card'
import { UiDebug } from '~/ui/ui-debug'
import { PubkeyUiCommunityItem } from './ui/pubkey-ui-community-item'
import { getPubkeySdkCommunity } from '~/lib/pubkey/get-pubkey-sdk-community'

export function meta() {
  return appMeta('Communities')
}

export async function loader({ params }: Route.LoaderArgs) {
  const sdk = getPubkeySdkCommunity()

  const community = await sdk.communityGet({ community: params.community })

  return { community }
}

export default function PubkeyFeatureCommunityDetail({ loaderData: { community }, params }: Route.ComponentProps) {
  if (!community) {
    return <UiError message={`Community ${params.community} not found :(`} />
  }
  return (
    <UiPage title={<PubkeyUiCommunityItem community={community as PubKeyCommunity} />} icon={<UiBackButton />}>
      <Container h="100%" style={{ overflow: 'auto' }}>
        <Stack>
          <UiCard title={<PubkeyUiCommunityItem community={community as PubKeyCommunity} />} />
          <UiDebug data={community} />
        </Stack>
      </Container>
    </UiPage>
  )
}

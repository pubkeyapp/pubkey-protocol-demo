import { Container, Stack } from '@mantine/core'
import type { PubKeyProfile } from '@pubkey-protocol/sdk'
import type { Route } from './+types/pubkey-feature-profile-detail'
import { appMeta } from '~/lib/app-meta'
import { UiError } from '~/ui/ui-alert'
import { UiPage } from '~/ui/ui-page'
import { UiBackButton } from '~/ui/ui-back-button'
import { UiCard } from '~/ui/ui-card'
import { UiDebug } from '~/ui/ui-debug'
import { PubkeyUiProfileItem } from './ui/pubkey-ui-profile-item'
import { getPubkeySdkCommunity } from '~/lib/pubkey/get-pubkey-sdk-community'

export function meta() {
  return appMeta('Communities')
}

export async function loader({ params }: Route.LoaderArgs) {
  const sdk = getPubkeySdkCommunity()

  const profile = await sdk.profileGet({ profile: params.profile })

  return { profile }
}

export default function PubkeyFeatureProfileDetail({ loaderData: { profile }, params }: Route.ComponentProps) {
  if (!profile) {
    return <UiError message={`Profile ${params.profile} not found :(`} />
  }
  return (
    <UiPage title={<PubkeyUiProfileItem profile={profile as PubKeyProfile} />} icon={<UiBackButton />}>
      <Container h="100%" style={{ overflow: 'auto' }}>
        <Stack>
          <UiCard title={<PubkeyUiProfileItem profile={profile as PubKeyProfile} />} />
          <UiDebug data={profile} />
        </Stack>
      </Container>
    </UiPage>
  )
}

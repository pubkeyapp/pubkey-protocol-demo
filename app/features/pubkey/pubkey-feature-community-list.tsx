import { Button, Container } from '@mantine/core'
import { appMeta } from '~/lib/app-meta'
import type { Route } from './+types/pubkey-feature-community-list'
import { UiAlert } from '~/ui/ui-alert'
import { Link } from 'react-router'
import { UiPage } from '~/ui/ui-page'
import { LucideGroup, LucidePlus } from 'lucide-react'
import type { PubKeyCommunity } from '@pubkey-protocol/sdk'
import { getPubkeySdkCommunity } from '~/lib/pubkey/get-pubkey-sdk-community'
import { PubkeyUiCommunityList } from '~/features/pubkey/ui/pubkey-ui-community-list'

export function meta() {
  return appMeta('Communities')
}

export async function loader() {
  const sdk = getPubkeySdkCommunity()
  const communities = await sdk.communityGetAll()

  return { communities }
}

export default function PubkeyFeatureCommunityList({ loaderData: { communities } }: Route.ComponentProps) {
  return (
    <UiPage
      title="Communities"
      icon={<LucideGroup />}
      action={
        <Button component={Link} to="./create" size="xs" variant="light" leftSection={<LucidePlus size={16} />}>
          Create
        </Button>
      }
    >
      <Container h="100%" style={{ overflow: 'auto' }}>
        {communities.length ? (
          <PubkeyUiCommunityList communities={communities as PubKeyCommunity[]} />
        ) : (
          <UiAlert message="No communities found." />
        )}
      </Container>
    </UiPage>
  )
}

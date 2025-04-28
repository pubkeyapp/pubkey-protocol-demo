import { Button, Container } from '@mantine/core'
import { appMeta } from '~/lib/app-meta'
import type { Route } from './+types/pubkey-feature-profile-list'
import { UiAlert } from '~/ui/ui-alert'
import { getPubkeySdkCommunity } from '~/lib/pubkey/get-pubkey-sdk-community'
import { LucidePlus, LucideUsers } from 'lucide-react'
import { Link } from 'react-router'
import { UiPage } from '~/ui/ui-page'

export function meta() {
  return appMeta('Profiles')
}

export async function loader() {
  const sdk = getPubkeySdkCommunity()
  const profiles = await sdk.profileGetAll()

  return { profiles }
}

export default function PubkeyFeatureProfiles({ loaderData: { profiles } }: Route.ComponentProps) {
  return (
    <UiPage
      title="Profiles"
      icon={<LucideUsers />}
      action={
        <Button component={Link} to="./create" size="xs" variant="light" leftSection={<LucidePlus size={16} />}>
          Create
        </Button>
      }
    >
      <Container h="100%" style={{ overflow: 'auto' }} p="xs">
        {profiles.length ? (
          profiles.map((profile) => <div key={profile.username}>{profile.name}</div>)
        ) : (
          <UiAlert message="No profiles found." />
        )}
      </Container>
    </UiPage>
  )
}

import type { PubKeyCommunity } from '@pubkey-protocol/sdk'
import { Stack } from '@mantine/core'
import { UiCard } from '~/ui/ui-card'
import { PubkeyUiCommunityItem } from '~/features/pubkey/ui/pubkey-ui-community-item'

export function PubkeyUiCommunityList({ communities }: { communities: PubKeyCommunity[] }) {
  return (
    <Stack>
      {communities.map((community) => (
        <UiCard
          title={
            <PubkeyUiCommunityItem
              avatarProps={{ size: 'md' }}
              anchorProps={{ size: 'xl', to: `./${community.slug}` }}
              community={community as PubKeyCommunity}
            />
          }
          key={community.slug}
        />
      ))}
    </Stack>
  )
}

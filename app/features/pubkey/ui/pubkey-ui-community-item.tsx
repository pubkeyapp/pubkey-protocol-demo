import { Group, type GroupProps, Stack } from '@mantine/core'
import { type PubKeyCommunity } from '@pubkey-protocol/sdk'
import { PubkeyUiCommunityAnchor, type PubkeyUiCommunityAnchorProps } from './pubkey-ui-community-anchor'
import { PubkeyUiCommunityAvatar, type PubkeyUiCommunityAvatarProps } from './pubkey-ui-community-avatar'
import { UiCard } from '~/ui/ui-card'

export function PubkeyUiCommunityItem({
  community,
  avatarProps = {},
  anchorProps = {},
  ...props
}: GroupProps & {
  community: PubKeyCommunity
  avatarProps?: Omit<PubkeyUiCommunityAvatarProps, 'community'>
  anchorProps?: Omit<PubkeyUiCommunityAnchorProps, 'community'>
}) {
  return (
    <Group gap="sm" {...props}>
      <PubkeyUiCommunityAvatar community={community} size="sm" {...avatarProps} />
      <PubkeyUiCommunityAnchor community={community} {...anchorProps} />
    </Group>
  )
}

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

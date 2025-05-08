import { Group, type GroupProps } from '@mantine/core'
import { type PubKeyCommunity } from '@pubkey-protocol/sdk'
import { PubkeyUiCommunityAnchor, type PubkeyUiCommunityAnchorProps } from './pubkey-ui-community-anchor'
import { PubkeyUiCommunityAvatar, type PubkeyUiCommunityAvatarProps } from './pubkey-ui-community-avatar'

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

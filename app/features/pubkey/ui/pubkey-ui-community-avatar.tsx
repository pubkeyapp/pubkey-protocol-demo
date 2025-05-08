import { Avatar, type AvatarProps } from '@mantine/core'
import type { PubKeyCommunity } from '@pubkey-protocol/sdk'

export interface PubkeyUiCommunityAvatarProps extends AvatarProps {
  community: PubKeyCommunity
}

export function PubkeyUiCommunityAvatar({ community: { avatarUrl, name }, ...props }: PubkeyUiCommunityAvatarProps) {
  return <Avatar src={avatarUrl ? avatarUrl : null} name={name} color="initials" radius="xs" size="lg" {...props} />
}

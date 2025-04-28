import type { PubKeyProfile } from '@pubkey-protocol/sdk'
import { Avatar, type AvatarProps } from '@mantine/core'

export interface PubkeyUiProfileAvatarProps extends AvatarProps {
  profile: PubKeyProfile
}

export function PubkeyUiProfileAvatar({ profile: { avatarUrl, name }, ...props }: PubkeyUiProfileAvatarProps) {
  return <Avatar src={avatarUrl ? avatarUrl : null} name={name} color="initials" radius={100} size="lg" {...props} />
}

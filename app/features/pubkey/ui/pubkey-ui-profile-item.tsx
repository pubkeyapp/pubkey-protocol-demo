import { Group, type GroupProps } from '@mantine/core'
import { type PubKeyProfile } from '@pubkey-protocol/sdk'
import { PubkeyUiProfileAnchor, type PubkeyUiProfileAnchorProps } from './pubkey-ui-profile-anchor'
import { PubkeyUiProfileAvatar, type PubkeyUiProfileAvatarProps } from './pubkey-ui-profile-avatar'

export function PubkeyUiProfileItem({
  profile,
  avatarProps = {},
  anchorProps = {},
  ...props
}: GroupProps & {
  profile: PubKeyProfile
  avatarProps?: Omit<PubkeyUiProfileAvatarProps, 'profile'>
  anchorProps?: Omit<PubkeyUiProfileAnchorProps, 'profile'>
}) {
  return (
    <Group gap="sm" {...props}>
      <PubkeyUiProfileAvatar profile={profile} size="sm" {...avatarProps} />
      <PubkeyUiProfileAnchor profile={profile} {...anchorProps} />
    </Group>
  )
}

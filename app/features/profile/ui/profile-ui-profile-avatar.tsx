import { Avatar, type AvatarProps } from '@mantine/core'
import type { UiIconProps } from '~/ui/ui-icon'
import type { Identity } from '~/lib/generated/zod'
import { ProfileUiProviderIcon } from '~/features/profile/ui/profile-ui-provider-icon'

export function ProfileUiProfileAvatar({
  identity,
  iconProps,
  ...props
}: AvatarProps & {
  iconProps?: Omit<UiIconProps, 'name'>
  identity: Identity
}) {
  const avatarUrl = (identity?.profile as Record<string, string>)?.avatarUrl
  if (avatarUrl) {
    return <Avatar src={avatarUrl} {...props} />
  }
  return <ProfileUiProviderIcon provider={identity.provider} {...iconProps} />
}

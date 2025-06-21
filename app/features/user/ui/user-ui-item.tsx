import { type AvatarProps, Group, type GroupProps, Text, type TextProps } from '@mantine/core'
import type { User } from '~/lib/db.server'
import { UserUiAvatar } from '~/features/user/ui/user-ui-avatar'

export function UserUiItem({
  user,
  avatarProps,
  textProps,
  ...props
}: GroupProps & {
  user: User
  avatarProps?: AvatarProps
  textProps?: TextProps
}) {
  return (
    <Group wrap="nowrap" gap="xs" {...props}>
      <UserUiAvatar user={user} size="sm" {...avatarProps} />
      <Text fw={500} size="xl" {...textProps}>
        {user.username}
      </Text>
    </Group>
  )
}

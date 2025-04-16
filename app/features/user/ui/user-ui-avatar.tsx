import { Avatar, type AvatarProps, Group, type GroupProps, Text, type TextProps } from '@mantine/core'
import type { User } from '~/lib/db.server'

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

export function UserUiAvatar({ user, ...props }: AvatarProps & { user: User }) {
  return (
    <Avatar src={user.avatarUrl} name={user.username} radius="xl" {...props}>
      {user.username.charAt(0)}
    </Avatar>
  )
}

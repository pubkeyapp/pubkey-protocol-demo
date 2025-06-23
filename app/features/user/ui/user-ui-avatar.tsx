import { Avatar, type AvatarProps } from '@mantine/core'
import type { User } from '~/lib/db.server'

export function UserUiAvatar({ user, ...props }: AvatarProps & { user: Pick<User, 'avatarUrl' | 'username'> }) {
  if (!user) {
    return null
  }
  return (
    <Avatar src={user?.avatarUrl} name={user?.username} radius="xl" {...props}>
      {(user?.username ?? '?').charAt(0)}
    </Avatar>
  )
}

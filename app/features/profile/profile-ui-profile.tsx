import type { UserFindByUsernameResult } from '~/lib/core/user-find-by-username'
import { Stack, Text } from '@mantine/core'
import { UserUiAvatar } from '~/features/user/ui/user-ui-avatar'
import React from 'react'

export function ProfileUiProfile({ user }: { user: UserFindByUsernameResult }) {
  return (
    <Stack w="100%" style={{ overflow: 'auto' }} align="center" mt="xl">
      <UserUiAvatar style={{ border: '3px solid #ffffff11' }} size={128} radius={100} user={user} />
      <Stack gap={4} align="center">
        <Text fw={700} fz={32}>
          {user.name}
        </Text>
        <Text fw={400} fz={18} c="dimmed">
          {user.username}
        </Text>
        <Text fw={400} fz={18}>
          Developer and Open Source Evangelist
        </Text>
      </Stack>
    </Stack>
  )
}

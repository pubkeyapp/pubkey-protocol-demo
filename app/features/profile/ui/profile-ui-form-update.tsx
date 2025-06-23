import { Button, Stack, TextInput } from '@mantine/core'
import type { User } from '~/lib/db.server'

export function ProfileUiFormUpdate({ user }: { user: User }) {
  return (
    <Stack>
      <input type="hidden" name="action" value="update" />
      <TextInput
        name="username"
        type="text"
        label="Username"
        description="Choose wisely, you won't be able to change it later."
        defaultValue={user.username}
      />
      <TextInput
        name="name"
        type="text"
        label="Name"
        description="Your name will be displayed on your profile."
        defaultValue={user.name ?? ''}
      />
      <TextInput
        name="avatarUrl"
        type="text"
        label="Avatar URL"
        description="Your avatar will be displayed on your profile."
        defaultValue={user.avatarUrl ?? ''}
      />
      <Button type="submit">Update</Button>
    </Stack>
  )
}

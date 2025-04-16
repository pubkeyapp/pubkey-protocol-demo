import { Button, Stack, TextInput } from '@mantine/core'
import type { User } from '~/lib/db.server'

export function ProfileUiFormUpdate({ user }: { user: User }) {
  return (
    <Stack>
      <input type="hidden" name="action" value="update"/>
      <TextInput name="username" type="text" placeholder="Username" defaultValue={user.username}/>
      <TextInput name="name" type="text" placeholder="Name" defaultValue={user.name ?? ''}/>
      <TextInput name="avatarUrl" type="text" placeholder="Avatar URL" defaultValue={user.avatarUrl ?? ''}/>
      <Button type="submit">Update</Button>
    </Stack>
  )
}

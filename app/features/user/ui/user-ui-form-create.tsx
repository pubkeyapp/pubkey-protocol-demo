import { Button, Stack, TextInput } from '@mantine/core'

export function UserUiFormCreate() {
  return (
    <Stack>
      <TextInput name="username" type="text" placeholder="Username" />
      <TextInput name="name" type="text" placeholder="Name" />
      <TextInput name="avatarUrl" type="text" placeholder="Avatar URL" />
      <Button type="submit">Create</Button>
    </Stack>
  )
}

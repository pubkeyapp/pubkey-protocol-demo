import { TextInput, type TextInputProps } from '@mantine/core'

export function PubkeyAuthUiFieldUsername(props: TextInputProps) {
  return (
    <TextInput description="The unique username of the user" label="Username" name="username" required {...props} />
  )
}

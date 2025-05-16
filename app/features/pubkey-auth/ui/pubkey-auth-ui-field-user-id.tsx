import { TextInput, type TextInputProps } from '@mantine/core'

export function PubkeyAuthUiFieldUserId(props: TextInputProps) {
  return <TextInput description="The unique id of the user" label="User ID" name="userId" required {...props} />
}

import { TextInput, type TextInputProps } from '@mantine/core'

export function PubkeyAuthUiFieldIdentityProviderId(props: TextInputProps) {
  return (
    <TextInput
      description="The unique id of the identity provider"
      label="Provider ID"
      name="providerId"
      required
      {...props}
    />
  )
}

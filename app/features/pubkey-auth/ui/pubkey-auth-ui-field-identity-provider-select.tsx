import { Select, type SelectProps } from '@mantine/core'
import { IdentityProvider } from '@prisma/client'
import { getEnumOptions } from '~/lib/get-enum-options'

export function PubkeyAuthUiFieldIdentityProviderSelect(props: SelectProps) {
  return (
    <Select
      data={getEnumOptions(IdentityProvider)}
      description="The identity provider"
      label="Provider"
      name="provider"
      required
      {...props}
    />
  )
}

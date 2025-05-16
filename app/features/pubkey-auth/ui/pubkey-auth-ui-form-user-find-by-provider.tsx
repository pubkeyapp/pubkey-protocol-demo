import type { PubkeyAuthFindUserByProvider } from '~/lib/pubkey-auth/pubkey-auth-database'
import { useForm } from '@mantine/form'
import { IdentityProvider } from '@prisma/client'
import { PubkeyAuthUiFieldIdentityProviderSelect } from './pubkey-auth-ui-field-identity-provider-select'
import { PubkeyAuthUiFieldIdentityProviderId } from './pubkey-auth-ui-field-identity-provider-id'
import { Button, Group, Stack } from '@mantine/core'

export function PubkeyAuthUiFormUserFindByProvider(props: {
  loading: boolean
  submit: (data: PubkeyAuthFindUserByProvider) => Promise<void>
}) {
  const form = useForm<PubkeyAuthFindUserByProvider>({
    initialValues: { provider: IdentityProvider.Solana, providerId: '' },
    validate: {
      provider: (value) => {
        return Object.keys(IdentityProvider).includes(value) ? null : 'Invalid identity provider'
      },
      providerId: (value, ctx) => {
        if (ctx.provider === IdentityProvider.Solana) {
          // TODO: check valid Solana pubkey
          return value.length >= 30 ? null : 'Provider ID too short'
        }
        // TODO: Figure out how to check other provider ids
        return value.length >= 1 ? null : 'Provider ID too short'
      },
    },
  })

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (!form.validate().hasErrors) {
          return await props.submit(form.values)
        }
        console.warn(`Form invalid:`, form.validate().errors)
      }}
    >
      <Stack>
        <PubkeyAuthUiFieldIdentityProviderSelect readOnly={props.loading} {...form.getInputProps('provider')} />
        <PubkeyAuthUiFieldIdentityProviderId readOnly={props.loading} {...form.getInputProps('providerId')} />
        <Group justify="right">
          <Button type="submit" loading={props.loading}>
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  )
}

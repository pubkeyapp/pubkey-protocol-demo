import type { PubkeyAuthFindUserByUsername } from '~/lib/pubkey-auth/pubkey-auth-database'
import { useForm } from '@mantine/form'
import { Button, Group, Stack } from '@mantine/core'

import { PubkeyAuthUiFieldUsername } from './pubkey-auth-ui-field-username'

export function PubkeyAuthUiFormUserFindByUsername(props: {
  loading: boolean
  submit: (data: PubkeyAuthFindUserByUsername) => Promise<void>
}) {
  const form = useForm<PubkeyAuthFindUserByUsername>({
    initialValues: { username: '' },
    validate: {
      username: (value) => {
        return value.length >= 1 ? null : 'User ID too short'
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
        <PubkeyAuthUiFieldUsername readOnly={props.loading} {...form.getInputProps('username')} />
        <Group justify="right">
          <Button type="submit" loading={props.loading}>
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  )
}

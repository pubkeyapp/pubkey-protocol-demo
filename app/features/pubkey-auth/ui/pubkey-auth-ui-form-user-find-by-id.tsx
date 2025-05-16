import type { PubkeyAuthFindUserById } from '~/lib/pubkey-auth/pubkey-auth-database'
import { useForm } from '@mantine/form'
import { Button, Group, Stack } from '@mantine/core'
import { PubkeyAuthUiFieldUserId } from './pubkey-auth-ui-field-user-id'

export function PubkeyAuthUiFormUserFindById(props: {
  loading: boolean
  submit: (data: PubkeyAuthFindUserById) => Promise<void>
}) {
  const form = useForm<PubkeyAuthFindUserById>({
    initialValues: { userId: '' },
    validate: {
      userId: (value) => {
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
        <PubkeyAuthUiFieldUserId readOnly={props.loading} {...form.getInputProps('userId')} />
        <Group justify="right">
          <Button type="submit" loading={props.loading}>
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  )
}

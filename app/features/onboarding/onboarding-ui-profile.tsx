import { useForm } from '@mantine/form'
import { Avatar, Button, Group, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'

export interface OnboardingUiProfileData {
  avatarUrl: string
  name: string
  username: string
}

export function OnboardingUiProfile({ submit }: { submit: (input: OnboardingUiProfileData) => Promise<void> }) {
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<OnboardingUiProfileData>({
    initialValues: {
      avatarUrl: '',
      name: '',
      username: '',
    },
    validate: {
      name: (value) => value?.length > 3,
      username: (value) => value?.length > 3,
    },
  })

  const username = form.values.username

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        setLoading(true)
        await submit({ ...values })
        setLoading(false)
      })}
    >
      <Group wrap="nowrap" gap="xs" align="start">
        <Avatar color="initials" name={username} size="xl" />
        <Stack gap="xs" w="100%">
          <TextInput
            description="Your display name can contain emoji and spaces."
            disabled={loading}
            label="Name"
            maxLength={50}
            minLength={3}
            placeholder="Name"
            required
            size="sm"
            {...form.getInputProps('name')}
          />
          <TextInput
            description="Choose wisely, your username cannot be changed!"
            disabled={loading}
            flex={1}
            label="Username"
            maxLength={20}
            minLength={3}
            placeholder="Username"
            required
            size="sm"
            {...form.getInputProps('username')}
          />

          <Button loading={loading} type="submit" disabled={!form.isValid()} fullWidth>
            Create Profile
          </Button>
        </Stack>
      </Group>
    </form>
  )
}

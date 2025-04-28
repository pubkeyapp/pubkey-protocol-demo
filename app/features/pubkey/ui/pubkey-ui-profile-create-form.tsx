import { Button, Group, TextInput } from '@mantine/core'
import { UiStack } from '~/ui/ui-stack'

export function PubkeyUiProfileCreateForm({ authority, loading }: { authority: string; loading: boolean }) {
  return (
    <UiStack>
      <TextInput
        label="Authority"
        name="authority"
        description="This wallet wil have authority over your account. You can later add more authorities"
        value={authority}
        readOnly
      />
      <TextInput
        name="username"
        label="Username"
        description="Pick your username wisely, you won't be able to change it later"
        placeholder="Enter your username"
      />
      <TextInput
        name="name"
        label="Name"
        description="Your name allows special characters like spaces and emoji, and you can always change it later!"
        placeholder="Enter your name"
      />
      <Group justify="right">
        <Button loading={loading} type="submit">
          Save
        </Button>
      </Group>
    </UiStack>
  )
}

import { Button, Group, TextInput } from '@mantine/core'
import { UiStack } from '~/ui/ui-stack'

export function PubkeyUiCommunityCreateForm({ loading }: { loading: boolean }) {
  return (
    <UiStack>
      <TextInput
        name="name"
        label="Name"
        placeholder="Enter the name of the new Community"
        minLength={1}
        maxLength={20}
      />
      <Group justify="right">
        <Button loading={loading} type="submit">
          Save
        </Button>
      </Group>
    </UiStack>
  )
}

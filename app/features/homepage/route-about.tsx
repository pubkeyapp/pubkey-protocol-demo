import { Group, Paper, Stack, Text } from '@mantine/core'
import { appMeta } from '~/lib/app-meta'

export function meta() {
  return appMeta('About')
}

export default function RouteAbout() {
  return (
    <Stack p="xl" gap="xl">
      <Paper withBorder p="md">
        <Group justify="space-between">
          <Text>About</Text>
        </Group>
      </Paper>
    </Stack>
  )
}

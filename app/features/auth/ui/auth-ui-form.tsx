import { Button, Divider, Paper, Stack, Text } from '@mantine/core'
import { Link } from 'react-router'
import { UiIcon } from '~/ui/ui-icon'

export function AuthUiForm({ title }: { title: string }) {
  return (
    <Paper shadow="lg" p="md" withBorder miw={400}>
      <Stack>
        <Text size="lg" fw={700} ta="center">
          {title}
        </Text>
        <Button
          component={Link}
          to="/api/auth/github"
          leftSection={<UiIcon name="Github" height={20} width={20} />}
          size="xl"
        >
          Sign in with GitHub
        </Button>
        <Button
          component={Link}
          to="/api/auth/google"
          leftSection={<UiIcon name="Google" height={20} width={20} />}
          size="xl"
        >
          Sign in with Google
        </Button>
        <Button component={Link} to="/api/auth/x" leftSection={<UiIcon name="X" height={20} width={20} />} size="xl">
          Sign in with X
        </Button>
        <Divider label="Coming soon..." />
        <Button
          disabled
          component={Link}
          to="/api/auth/discord"
          leftSection={<UiIcon name="Discord" height={20} width={20} />}
          size="xl"
        >
          Sign in with Discord
        </Button>
        <Button
          disabled
          component={Link}
          to="/api/auth/telegram"
          leftSection={<UiIcon name="Telegram" height={20} width={20} />}
          size="xl"
        >
          Sign in with Telegram
        </Button>
      </Stack>
    </Paper>
  )
}

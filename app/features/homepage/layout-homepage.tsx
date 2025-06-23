import { Anchor, Box, Button, Container, Group, Loader, ScrollArea, Stack } from '@mantine/core'
import React, { Suspense } from 'react'
import { Link, Outlet } from 'react-router'
import { getUser } from '~/features/auth/data-access/get-user'
import type { Route } from './+types/layout-homepage'
import { UiThemeToggle } from '~/ui/ui-theme-toggle'
import { UiLogoLink } from '~/ui/ui-logo-link'
import { UiProfileAvatar } from '~/ui/ui-profile-avatar'
import { LucideRocket } from 'lucide-react'

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request)

  return { user }
}

export default function LayoutHomepage({ loaderData: { user } }: Route.ComponentProps) {
  return (
    <ScrollArea
      styles={{
        content: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
      h="100%"
    >
      <Box>
        <Container size="lg">
          <Group justify="space-between" component="header" p="xs" w="100%" pt="xl">
            <Group>
              <UiLogoLink to={user ? '/dashboard' : '/'} height={32} width={128} />
            </Group>
            <Group gap="xs">
              {user ? (
                <UiProfileAvatar user={user} />
              ) : (
                <Button component={Link} to="/login" size="xs" variant="light" leftSection={<LucideRocket size={16} />}>
                  Get Started
                </Button>
              )}
              <UiThemeToggle variant="outline" radius="xl" size="md" iconSize={16} />
            </Group>
          </Group>
        </Container>
      </Box>
      <Box component="main" style={{ flexGrow: 1 }}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Box>
      <Stack gap="md" mt="xl">
        <Group justify="center" component="footer" p="md" w="100%">
          <Anchor size="xs" c="dimmed" component={Link} to="/terms">
            Terms of Service
          </Anchor>
          <Anchor size="xs" c="dimmed" component={Link} to="/privacy">
            Privacy Policy
          </Anchor>
        </Group>
      </Stack>
    </ScrollArea>
  )
}

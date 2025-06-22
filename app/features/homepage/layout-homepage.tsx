import { Anchor, Box, Container, Group, Loader, ScrollArea, Stack } from '@mantine/core'
import React, { Suspense } from 'react'
import { Link, Outlet } from 'react-router'
import { getUser } from '~/features/auth/data-access/get-user'
import type { Route } from './+types/layout-homepage'
import { UiThemeToggle } from '~/ui/ui-theme-toggle'
import { ProfileUiPoweredBy } from '~/features/profile/profile-ui-powered-by'
import { UiLogoLink } from '~/ui/ui-logo-link'

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
              <UiLogoLink height={32} width={128} />
            </Group>
            <Group>
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
        <Group justify="center" component="footer" w="100%">
          <ProfileUiPoweredBy />
        </Group>
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

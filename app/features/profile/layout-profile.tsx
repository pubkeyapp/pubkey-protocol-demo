import { Box, Flex, Group, Loader } from '@mantine/core'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router'
import { getUser } from '~/features/auth/data-access/get-user'
import type { Route } from './+types/layout-profile'
import { useColorScheme } from '@mantine/hooks'
import { UiThemeToggle } from '~/ui/ui-theme-toggle'
import { ProfileUiPoweredBy } from '~/features/profile/profile-ui-powered-by'

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request)

  return { user }
}

export default function LayoutProfile({ loaderData: { user } }: Route.ComponentProps) {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  return (
    <Flex h="100%" w="100%" direction="column" align="center">
      <Group justify="end" component="header" p="xs" w="100%">
        <UiThemeToggle variant="outline" radius="xl" size="md" iconSize={16} />
      </Group>

      <Box component="main" w="100%" style={{ flexGrow: 1 }}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Box>
      <Group justify="center" component="footer" p="xl" w="100%">
        <ProfileUiPoweredBy />
      </Group>
    </Flex>
  )
}

import { Stack } from '@mantine/core'
import { ensureUser } from '~/features/auth/data-access/ensure-user'
import { appMeta } from '~/lib/app-meta'
import { ph } from '~/lib/get-post-hog.server'
import { UiCard } from '~/ui/ui-card'
import { UiContainer } from '~/ui/ui-container'
import { useThemes } from '~/ui/use-themes'
import type { Route } from './+types/route-dashboard'
import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { redirect } from 'react-router'

export function meta() {
  return appMeta('Dashboard')
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await ensureUser(request)
    ph.capture({ distinctId: user.id, event: 'route-dashboard', properties: { path: '/dashboard' } })
    await ph.shutdown()

    return { user }
  } catch {
    return redirect('/login')
  }
}

export default function RouteDashboard({ loaderData: { user } }: Route.ComponentProps) {
  const { isDark } = useThemes()
  const backgroundColor = isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)'

  return (
    <UiContainer py="md" size="md" mb="xl">
      <Stack>
        <UiCard title={`Hey, ${user.username}!`} style={{ backgroundColor }} shadow="md" withBorder={false}>
          <WalletMultiButton size="xl" />
        </UiCard>
      </Stack>
    </UiContainer>
  )
}

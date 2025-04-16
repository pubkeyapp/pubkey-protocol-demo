import { Button, Stack, Text } from '@mantine/core'
import { Link, redirect } from 'react-router'
import { ensureUser } from '~/features/auth/data-access/ensure-user'
import { ProfileUiFormUpdate } from '~/features/profile/ui/profile-ui-form-update'
import { appMeta } from '~/lib/app-meta'
import { userUpdateProfile } from '~/lib/core/user-update-profile'
import { ph } from '~/lib/get-post-hog.server'
import { UiCard } from '~/ui/ui-card'
import { UiContainer } from '~/ui/ui-container'
import { UiDebug } from '~/ui/ui-debug'
import { useThemes } from '~/ui/use-themes'
import type { Route } from './+types/profile-feature'

export function meta() {
  return appMeta('Dashboard')
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await ensureUser(request)
  if (!user) {
    return redirect('/login')
  }
  ph.capture({ distinctId: user.id, event: 'route-profile', properties: { path: '/profile' } })
  await ph.shutdown()
  return { user }
}

export async function action({ request, params: { id } }: Route.ActionArgs) {
  const user = await ensureUser(request)
  const formData = await request.formData()

  const action = formData.get('action')?.toString() ?? ''

  if (action === 'update') {
    const username = formData.get('username')?.toString() ?? ''

    if (username.trim().length < 3) {
      throw new Error('Username must be at least 3 characters')
    }

    const item = await userUpdateProfile(user.id, {
      avatarUrl: formData.get('avatarUrl')?.toString(),
      name: formData.get('name')?.toString(),
      username,
    })

    return { item }
  }
}

export default function ProfileFeature({ loaderData }: Route.ComponentProps) {
  const { isDark } = useThemes()
  const backgroundColor = isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)'

  return (
    <UiContainer py="md" size="md" mb="xl">
      <Stack>
        <UiCard title="Profile" style={{ backgroundColor }} shadow="md" withBorder={false}>
          <ProfileUiFormUpdate user={loaderData.user}></ProfileUiFormUpdate>
        </UiCard>
        <UiCard title="Social Identities" style={{ backgroundColor }} shadow="md" withBorder={false}>
          {loaderData.user.identities.map((item) => (
            <div key={item.id}>
              <Text size="sm" fw={500}>
                {item.name}
              </Text>
              <Text size="sm" c="dimmed">
                {item.address}
              </Text>
              <Text size="sm" c="dimmed">
                {item.provider}
              </Text>
              <UiDebug data={item} defaultExpanded={true} withExpandButton={false} />
            </div>
          ))}

          <Button component={Link} to="/api/auth/google">
            Add Google Identity
          </Button>
        </UiCard>
        <UiDebug data={loaderData} />
      </Stack>
    </UiContainer>
  )
}

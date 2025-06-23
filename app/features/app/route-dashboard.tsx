import { Accordion, Stack, Text } from '@mantine/core'
import { ensureUser } from '~/features/auth/data-access/ensure-user'
import { appMeta } from '~/lib/app-meta'
import { UiContainer } from '~/ui/ui-container'
import type { Route } from './+types/route-dashboard'
import { redirect } from 'react-router'
import React, { useMemo } from 'react'
import { UiDebug } from '~/ui/ui-debug'
import { UiIcon } from '~/ui/ui-icon'
import { LucideDatabase, LucidePencil, LucideRocket } from 'lucide-react'
import { ProfileUiIdentityList } from '~/features/profile/profile-ui-identity-list'
import { ProfileUiProfile } from '~/features/profile/profile-ui-profile'
import { userUpdateProfile } from '~/lib/core/user-update-profile'
import { ProfileUiFormUpdate } from '~/features/profile/ui/profile-ui-form-update'

export function meta() {
  return appMeta('Dashboard')
}

type User = Awaited<ReturnType<typeof ensureUser>>

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await ensureUser(request)

    return { user }
  } catch {
    return redirect('/login')
  }
}

export async function action({ request }: Route.ActionArgs) {
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

interface Step {
  value: string
  label: string
  emoji: React.ReactNode
}

const steps = [
  {
    value: 'Social',
    label: 'Sign up with Social',
    emoji: <LucideRocket />,
  },
  {
    value: 'Solana',
    label: 'Verify Solana Identity',
    emoji: <UiIcon name="Solana" />,
  },
  {
    value: 'Profile',
    label: 'Review your Profile',
    emoji: <LucidePencil />,
  },
  {
    value: 'Sign',
    label: 'Sign and store on Solana',
    emoji: <LucideDatabase />,
  },
]

export default function RouteDashboard({ loaderData: { user } }: Route.ComponentProps) {
  const done = useMemo(() => stepsDone({ user }), [user])
  const nextStep = useMemo(() => {
    const next = steps.find((step) => !done.includes(step.value))
    return next?.value ?? 'Sign'
  }, [done])

  return (
    <UiContainer py="md" size="sm" mb="xl">
      <Stack>
        <ProfileUiProfile user={user} />
        <Accordion
          variant="separated"
          defaultValue={steps.map((step) => step.value).filter((step) => !done.includes(step))}
          multiple
          radius="lg"
        >
          {steps.map((item) => (
            <Accordion.Item
              key={item.value}
              value={item.value}
              style={{
                borderColor: done.includes(item.value) ? 'var(--mantine-color-green-5)' : undefined,
              }}
            >
              <Accordion.Control color={'red'} icon={item.emoji}>
                {item.label}
              </Accordion.Control>
              <Accordion.Panel>
                <RenderStep step={item} user={user} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <pre>{JSON.stringify({ done, nextStep }, null, 2)}</pre>
        <UiDebug data={user} />
      </Stack>
    </UiContainer>
  )
}

function RenderStep({ step, user }: { step: Step; user: User }) {
  if (step.value === 'Social') {
    return <PanelSocial user={user} />
  }
  if (step.value === 'Solana') {
    return <PanelSolana user={user} />
  }
  if (step.value === 'Profile') {
    return <PanelProfile user={user} />
  }
  if (step.value === 'Sign') {
    return <div>Sign a transaction to create your profile on Solana.</div>
  }
  return <div>Unknown</div>
}

function stepsDone({ user }: { user: User }): string[] {
  const steps: string[] = []
  if (findUserIdentitiesSocial({ user }).length) {
    steps.push('Social')
  }
  if (findUserIdentitiesSolana({ user }).length) {
    steps.push('Solana')
  }
  return steps
}

function findUserIdentitiesSocial({ user }: { user: User }) {
  return user.identities?.filter((i) => i.provider !== 'Solana') ?? []
}

function findUserIdentitiesSolana({ user }: { user: User }) {
  return user.identities?.filter((i) => i.provider === 'Solana') ?? []
}

function PanelSocial({ user }: { user: User }) {
  const found = findUserIdentitiesSocial({ user })

  return found.length ? (
    <Stack>
      <ProfileUiIdentityList identities={found} />
    </Stack>
  ) : (
    <div>No socials</div>
  )
}

function PanelSolana({ user }: { user: User }) {
  const found = findUserIdentitiesSolana({ user })

  return found.length ? (
    <Stack>
      <Text>Solana: {found?.length} solana identities</Text>
      <ProfileUiIdentityList identities={found} />
    </Stack>
  ) : (
    <div>No solana</div>
  )
}

function PanelProfile({ user }: { user: User }) {
  return (
    <Stack>
      <ProfileUiFormUpdate user={user}></ProfileUiFormUpdate>
    </Stack>
  )
}

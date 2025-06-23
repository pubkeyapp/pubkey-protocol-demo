import { Button, Container, Flex, Stack } from '@mantine/core'
import { appMeta } from '~/lib/app-meta'
import { userFindByUsername } from '~/lib/core/user-find-by-username'
import type { Route } from './+types/profile-feature-detail'
import { getUser } from '~/features/auth/data-access/get-user'
import { Link } from 'react-router'
import { LucidePencil } from 'lucide-react'
import { ProfileUiPoweredBy } from '~/features/profile/profile-ui-powered-by'
import React from 'react'
import { ProfileUiIdentityList } from '~/features/profile/profile-ui-identity-list'
import { ProfileUiProfile } from '~/features/profile/profile-ui-profile'

export async function loader(args: Route.LoaderArgs) {
  const [profile, user] = await Promise.all([
    //
    userFindByUsername(args.params.username),
    getUser(args.request),
  ])

  return { profile, user }
}

export function meta(meta: Route.MetaArgs) {
  return appMeta(`${meta.data?.profile?.username} - User detail`)
}

export default function ProfileFeatureDetail({ loaderData: { profile, user } }: Route.ComponentProps) {
  if (!profile) {
    return <div>Profile not found</div>
  }
  return (
    <Container
      size="xs"
      w="100%"
      h="100%"
      display="flex"
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Stack align="center" pt="xl" gap="xl">
        <ProfileUiProfile user={profile} />
        <ProfileUiIdentityList identities={profile.identities ?? []} />
        {user?.id === profile.id ? (
          <Button component={Link} to="/profile" size="sm" variant="light" leftSection={<LucidePencil size={16} />}>
            Edit Profile
          </Button>
        ) : null}
      </Stack>
      <Flex justify="center">
        <ProfileUiPoweredBy mt="xl" to={user ? '/dashboard' : '/'} />
      </Flex>
    </Container>
  )
}

import { ActionIcon, Card, Container, CopyButton, Group, Stack, Text, type TextProps, Tooltip } from '@mantine/core'
import { appMeta } from '~/lib/app-meta'
import { userFindByUsername, type UserFindByUsernameResult } from '~/lib/core/user-find-by-username'
import type { Route } from './+types/profile-feature-detail'
import { UserUiAvatar } from '~/features/user/ui/user-ui-avatar'
import { ProfileUiProviderIcon } from '~/features/profile/ui/profile-ui-provider-icon'
import type { Identity } from '~/lib/generated/zod'
import { IdentityProvider } from '@prisma/client'
import { ellipsify, getExplorerUrl } from '@pubkey-protocol/sdk'
import { UiIcon } from '~/ui/ui-icon'

export async function loader({ params: { username } }: Route.LoaderArgs) {
  const user = await userFindByUsername(username)

  return { user }
}

export function meta(meta: Route.MetaArgs) {
  return appMeta(`${meta.data?.user?.username} - User detail`)
}

export default function ProfileFeatureDetail({ loaderData: { user } }: Route.ComponentProps) {
  if (!user) {
    return <div>User not found</div>
  }
  return (
    <Container size="xs" w="100%">
      <Stack align="center" pt="xl" gap="xl">
        <ProfileUiProfile user={user} />
        <ProfileUiIdentityList user={user} />
      </Stack>
    </Container>
  )
}

function ProfileUiProfile({ user }: { user: UserFindByUsernameResult }) {
  return (
    <Stack w="100%" style={{ overflow: 'auto' }} align="center" mt="xl">
      <UserUiAvatar style={{ border: '3px solid #ffffff11' }} size={128} radius={100} user={user} />
      <Stack gap={4} align="center">
        <Text fw={700} fz={32}>
          {user.username}
        </Text>
        <Text fw={400} fz={18}>
          Developer and Open Source Evangelist
        </Text>
      </Stack>
    </Stack>
  )
}

function ProfileUiIdentityList({ user }: { user: UserFindByUsernameResult }) {
  return (
    <Stack w="100%">
      {user.identities.map((identity) => (
        <ProfileUiIdentityListItem key={identity.id} identity={identity} />
      ))}
    </Stack>
  )
}

function ProfileUiIdentityListItem({ identity }: { identity: Identity }) {
  return (
    <Card withBorder bg="inherit" shadow="sm" radius="lg" p={0}>
      <Group px="lg" py="md" justify="space-between" align="center">
        <Group>
          <ProfileUiProviderIcon provider={identity.provider} size="lg" />
          <Stack gap={0}>
            <Text size="md" fw={500}>
              {identity.provider}
            </Text>
            <ProfileUiIdentityName size="sm" c="dimmed" identity={identity} />
          </Stack>
        </Group>
        <Group gap="xs">
          <CopyButton value={identity.name ?? identity.providerId} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied' : `Copy ${identity.provider} name`} withArrow position="top">
                <ActionIcon size="lg" variant="light" color={copied ? 'teal' : 'gray'} radius="md" onClick={copy}>
                  {copied ? <UiIcon name="Copy" size="xs" /> : <UiIcon name="Copy" size="xs" />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
          <Tooltip label={`View ${identity.provider} profile`}>
            <ActionIcon
              component={'a'}
              href={getIdentityUrl(identity)}
              target="_blank"
              size="lg"
              variant="light"
              color="gray"
              radius="md"
            >
              <UiIcon name="ExternalLink" size="xs" />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Card>
  )
}

function ProfileUiIdentityName({ identity, ...props }: TextProps & { identity: Identity }) {
  if (!identity.name) {
    return (
      <Text {...props}>
        {identity.providerId} ({identity.provider})
      </Text>
    )
  }
  const text = identity.provider === IdentityProvider.Solana ? ellipsify(identity.providerId, 8) : identity.name
  return <Text {...props}>{text}</Text>
}

function getIdentityUrl(identity: Identity) {
  switch (identity.provider) {
    case IdentityProvider.Discord:
      return `https://discord.com/users/${identity.providerId}`
    case IdentityProvider.Github:
      return `https://github.com/${identity.name}`
    case IdentityProvider.Google:
      return `https://mail.google.com/mail/?view=cm&to=${identity.address}`
    case IdentityProvider.Solana:
      return getExplorerUrl(`address/${identity.providerId}`, 'devnet')
    case IdentityProvider.Telegram:
      return `https://t.me/${identity.name}`
    case IdentityProvider.X:
      return `https://x.com/${identity.name}`
    default:
      return undefined
  }
}

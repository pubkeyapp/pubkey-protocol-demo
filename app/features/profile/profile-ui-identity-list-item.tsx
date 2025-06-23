import type { Identity } from '~/lib/generated/zod'
import { ActionIcon, Card, CopyButton, Group, Stack, Text, Tooltip } from '@mantine/core'
import { ProfileUiProviderIcon } from '~/features/profile/ui/profile-ui-provider-icon'
import { ProfileUiIdentityName } from '~/features/profile/profile-ui-identity-name'
import { UiIcon } from '~/ui/ui-icon'
import { getIdentityUrl } from '~/features/profile/get-identity-url'
import React from 'react'

export function ProfileUiIdentityListItem({ identity }: { identity: Identity }) {
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
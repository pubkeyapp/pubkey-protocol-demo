import type { Identity } from '~/lib/generated/zod'
import { Stack } from '@mantine/core'
import { ProfileUiIdentityListItem } from '~/features/profile/profile-ui-identity-list-item'
import React from 'react'

export function ProfileUiIdentityList({ identities }: { identities: Identity[] }) {
  return (
    <Stack w="100%">
      {identities.map((identity) => (
        <ProfileUiIdentityListItem key={identity.id} identity={identity} />
      ))}
    </Stack>
  )
}

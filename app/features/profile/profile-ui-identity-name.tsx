import { Text, type TextProps } from '@mantine/core'
import type { Identity } from '~/lib/generated/zod'
import { IdentityProvider } from '@prisma/client'
import { ellipsify } from '@pubkey-protocol/sdk'
import React from 'react'

export function ProfileUiIdentityName({ identity, ...props }: TextProps & { identity: Identity }) {
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
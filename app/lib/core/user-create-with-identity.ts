import { Prisma } from '@prisma/client'
import type { IdentityProfile } from '~/lib/strategies/google-strategy'
import { db } from '~/lib/db.server'

export async function userCreateWithIdentity(data: Prisma.IdentityCreateWithoutOwnerInput) {
  const profile = (data.profile ?? {}) as IdentityProfile
  const username = profile.username ?? `${data.providerId}-${data.provider}`

  return await db.user.create({
    data: { username, avatarUrl: profile.avatarUrl, name: data.name, identities: { create: data } },
    include: { identities: true },
  })
}

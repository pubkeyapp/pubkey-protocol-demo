import { Prisma } from '@prisma/client'
import type { IdentityProfile } from '~/lib/strategies/identity-profile'
import { db } from '~/lib/db.server'
import { ensureUniqueUsername } from '~/lib/core/ensure-unique-username'

export async function userCreateWithIdentity(data: Prisma.IdentityCreateWithoutOwnerInput) {
  const profile = (data.profile ?? {}) as IdentityProfile
  const username = await ensureUniqueUsername(profile.username ?? `${data.providerId}-${data.provider}`)

  return await db.user.create({
    data: {
      username,
      avatarUrl: profile.avatarUrl,
      name: data.name,
      bio: profile.bio,
      identities: { create: data },
    },
    include: { identities: true },
  })
}

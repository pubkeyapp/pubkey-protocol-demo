import { Prisma } from '@prisma/client'
import { userFindById } from '~/lib/core/user-find-by-id'
import { db } from '~/lib/db.server'
import { userUpdateWithIdentity } from '~/lib/core/user-update-with-identity'
import { logger } from '~/lib/logger'

export async function userEnsureVerifiedIdentity(userId: string, data: Prisma.IdentityCreateWithoutOwnerInput) {
  const user = await userFindById(userId)
  const identity = user?.identities.find((i) => i.provider === data.provider && i.providerId === data.providerId)

  if (!identity) {
    logger.info({ event: 'user_ensure_verified_identity_create', userId, identityId: data.providerId })
    return userUpdateWithIdentity(userId, data)
  }

  if (identity?.verified) {
    logger.info({ event: 'user_ensure_verified_identity_skip', userId, identityId: identity.id })
    return user
  }

  logger.info({ event: 'user_ensure_verified_identity_update', userId, identityId: identity.id })
  return db.user.update({
    where: { id: userId },
    data: { identities: { update: { where: { id: identity.id }, data: { ...data, verified: true } } } },
    include: { identities: true },
  })
}

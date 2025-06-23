import { Prisma } from '@prisma/client'
import { db } from '~/lib/db.server'

export async function userUpdateWithIdentity(userId: string, data: Prisma.IdentityCreateWithoutOwnerInput) {
  return await db.user.update({
    where: { id: userId },
    data: { identities: { create: { ...data, verified: true } } },
    include: { identities: true },
  })
}

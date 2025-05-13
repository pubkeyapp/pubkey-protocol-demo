import { prisma } from '~/lib/db.server'
import { IdentityProvider } from '@prisma/client'

export async function getUserByIdentity({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
  return await prisma.user.findFirst({
    include: { identities: true },
    where: { identities: { some: { provider, providerId } } },
  })
}

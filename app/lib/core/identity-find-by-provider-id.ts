import { IdentityProvider } from '@prisma/client'
import { db } from '~/lib/db.server'

export async function identityFindByProviderId({
  provider,
  providerId,
}: {
  provider: IdentityProvider
  providerId: string
}) {
  return await db.user.findFirst({
    where: { identities: { some: { providerId, provider } } },
    include: { identities: true },
  })
}

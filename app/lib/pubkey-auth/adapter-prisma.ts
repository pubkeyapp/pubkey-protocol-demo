import { db } from '~/lib/db.server'
import type { PubkeyAuthDatabase } from './pubkey-auth-database'

export function adapterPrisma(): PubkeyAuthDatabase {
  return {
    findUserByProvider: async (options) => {
      return await db.user
        .findFirst({
          where: { identities: { some: { providerId: options.providerId, provider: options.provider } } },
          include: { identities: true },
        })
        .then((user) => user ?? undefined)
    },
    findUserById: async (options) => {
      return await db.user
        .findUnique({ where: { id: options.userId }, include: { identities: true } })
        .then((user) => user ?? undefined)
    },
    findUserByUsername: async (options) => {
      return await db.user
        .findUnique({ where: { username: options.username }, include: { identities: true } })
        .then((user) => user ?? undefined)
    },
  }
}

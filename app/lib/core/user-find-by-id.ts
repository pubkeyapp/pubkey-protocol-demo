import { db } from '~/lib/db.server'

export async function userFindById(id: string) {
  return await db.user.findFirst({ where: { id }, include: { identities: true } }).then((user) => {
    if (!user?.identities?.length) {
      return user
    }
    return {
      ...user,
      identities: user?.identities.map((identity) =>
        //
        ({
          ...identity,
          profile: {
            ...((identity.profile ?? {}) as Record<string, string>),
            raw: undefined,
          },
        }),
      ),
    }
  })
}

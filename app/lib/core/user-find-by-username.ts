import { db } from '~/lib/db.server'

export async function userFindByUsername(username: string) {
  const found = await db.user.findFirst({ where: { username }, include: { identities: true } })
  if (!found) {
    throw new Error('User not found')
  }
  return found
}

export type UserFindByUsernameResult = Awaited<ReturnType<typeof userFindByUsername>>

import { db, type User } from '~/lib/db.server'

export async function userFindByUsername(username?: string, throwError = true): Promise<User | undefined> {
  const found = await db.user.findFirst({ where: { username } })
  if (!found && throwError) {
    throw new Error('User not found')
  }
  return found ?? undefined
}
